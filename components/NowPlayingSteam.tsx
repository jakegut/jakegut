import React from "react";
import ReadmeImg from "./ReadmeImg";
import Text from "./Text";

export interface Props {
  username: string,
  avatar: string,
  gameextrainfo: any,
}

export const Status: React.FC<Props> = ({
  username,
  avatar,
  gameextrainfo
}) => {
  return (
    <ReadmeImg width="256" height="64">
      <style>
        {`
            div {
              background-color: #161616;
              color: #7cc142;
              border-radius: 3px
            }
            .paused { 
              animation-play-state: paused !important;
              background: #e1e4e8 !important;
            }

            img:not([src]) {
              content: url("data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
              border-radius: 6px;
              background: #FFF;
              border: 1px solid #e1e4e8;
            }

            p {
              display: block;
              opacity: 0;
            }
            
            .progress-bar,
            #track,
            #artist,
            #cover {
              opacity: 0;
              animation: appear 300ms ease-out forwards;
            }

            #track {
              animation-delay: 400ms;
            }
            #artist {
              animation-delay: 500ms;
            }
            .progress-bar {
              animation-delay: 550ms;
              margin-top: 4px;
            }

            #cover {
              animation-name: cover-appear;
              animation-delay: 300ms;
              box-shadow: 0px 0px 3px 1px RGBA(124, 193, 66, 0.75);
              border: solid 1px RGB(124, 193, 66);
            }

            #cover:not([src]) {
              box-shadow: none;
            }

            @keyframes cover-appear {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            @keyframes appear {
              from {
                opacity: 0;
                transform: translateX(-8px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
        `}
      </style>
      <div
        className={gameextrainfo ? "disabled" : ""}
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 4,
          paddingRight: 4
        }}
      >
        <img id="cover" src={avatar ?? null} width="48" height="48" />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            marginTop: -4,
            marginLeft: 8,
          }}
        >
          <Text id="track" weight="bold">
            {gameextrainfo ? "In-game" : "Online"}
          </Text>
          <Text id="artist" color={!gameextrainfo ? "gray" : undefined}>
            {gameextrainfo || username}
          </Text>
        </div>
      </div>
    </ReadmeImg>
  );
};
