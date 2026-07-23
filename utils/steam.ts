import fetch from "isomorphic-unfetch";

const { 
    STEAM_WEB_API_KEY,
    STEAM_ID
} = process.env;

// export async function getCurrentlyPlaying(username){
//     return fetch(`https://steamcommunity.com/id/${username}?xml=1`)
//         .then(response => response.text())
//         .then(str => (new DOMParser()).parseFromString(str, "text/xml"))
//         .then(data => {return data.documentElement})
// }

export async function getCurrentlyPlaying(){
    const response = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_WEB_API_KEY}&steamids=${STEAM_ID}`)
    if (response.status !== 200) {
        console.error(`Steam player-summaries request failed with status ${response.status}`);
        return {};
    }
    const json = await response.json();
    return json?.response?.players?.[0] ?? {};
}