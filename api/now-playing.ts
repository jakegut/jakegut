import { NowRequest, NowResponse } from "@vercel/node";
import { renderToString } from "react-dom/server";
import { decode } from "querystring";
import { Player } from "../components/NowPlaying";
import { nowPlaying } from "../utils/spotify";

export default async function (req: NowRequest, res: NowResponse) {
  const params = decode(req.url.split("?")[1]) as any;
  const isHealthCheck = params && typeof params.health !== "undefined";

  let data: any = {};
  try {
    data = await nowPlaying();
  } catch (err) {
    console.error(err);
    // Only the ?health=1 signal surfaces the failure as a non-200 so the
    // GitHub Actions poller can detect an expired token. The bare endpoint
    // still returns 200 (an empty widget) so the profile README keeps rendering.
    if (isHealthCheck) {
      return res.status(502).send("spotify request failed");
    }
  }

  if (isHealthCheck) {
    return res.status(200).send("ok");
  }

  const {
    item = {},
    is_playing: isPlaying = false,
    progress_ms: progress = 0,
  } = data;

  if (params && typeof params.open !== "undefined") {
    if (item && item.external_urls) {
      res.writeHead(302, {
        Location: item.external_urls.spotify,
      });
      return res.end();
    }
    return res.status(200).end();
  }

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  const { duration_ms: duration, name: track } = item;
  const { images = [] } = item.album || {};

  const cover = images[images.length - 1]?.url;
  let coverImg = null;
  if (cover) {
    const buff = await (await fetch(cover)).arrayBuffer();
    coverImg = `data:image/jpeg;base64,${Buffer.from(buff).toString("base64")}`;
  }

  const artist = (item.artists || []).map(({ name }) => name).join(", ");
  const text = renderToString(
    Player({ cover: coverImg, artist, track, isPlaying, progress, duration })
  );
  return res.status(200).send(text);
}
