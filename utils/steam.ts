import fetch from "isomorphic-unfetch";

const STEAM_WEB_API_KEY = "CCBF04009862ACB3C010A69281404C28"
const STEAM_ID = "76561198063897772"

// export async function getCurrentlyPlaying(username){
//     return fetch(`https://steamcommunity.com/id/${username}?xml=1`)
//         .then(response => response.text())
//         .then(str => (new DOMParser()).parseFromString(str, "text/xml"))
//         .then(data => {return data.documentElement})
// }

export async function getCurrentlyPlaying(){
    return fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_WEB_API_KEY}&steamids=${STEAM_ID}`)
        .then(response => response.json())
        .then(json => {
            return json.response.players[0]
        })
}