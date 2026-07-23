// One-off helper to mint a Spotify refresh token for the now-playing endpoint.
//
// Usage:
//   export SPOTIFY_CLIENT_ID=...
//   export SPOTIFY_CLIENT_SECRET=...
//   node scripts/get-spotify-refresh-token.mjs
//
// Then open the printed URL, approve access, and copy the refresh token from
// the terminal into the SPOTIFY_REFRESH_TOKEN env var in Vercel.
//
// The redirect URI below must be registered EXACTLY in your Spotify app's
// settings (Spotify requires https or a loopback literal IP such as 127.0.0.1;
// "localhost" is rejected).

import http from "node:http";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPE = "user-read-currently-playing user-read-playback-state";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars first.");
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/callback") return res.end();

  const error = url.searchParams.get("error");
  if (error) {
    res.end(`Auth error: ${error}. Check the terminal.`);
    console.error("\nAuthorization denied/failed:", error);
    server.close();
    return;
  }

  const code = url.searchParams.get("code");
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenRes.json();
  if (data.refresh_token) {
    res.end("Success! Copy the refresh token from your terminal. You can close this tab.");
    console.log("\n==================== NEW REFRESH TOKEN ====================\n");
    console.log(data.refresh_token);
    console.log("\n===========================================================");
    console.log("\nUpdate SPOTIFY_REFRESH_TOKEN in Vercel with the value above, then redeploy.");
  } else {
    res.end("Token exchange failed. Check the terminal.");
    console.error("\nToken exchange failed:", data);
  }
  server.close();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`\nRegistered redirect URI must be exactly:\n  ${REDIRECT_URI}\n`);
  console.log("Open this URL in your browser and approve access:\n");
  console.log(authUrl.toString() + "\n");
});
