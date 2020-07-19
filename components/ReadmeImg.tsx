import React from "react";

const ReadmeImg = ({ width, height, children }) => {
  return (
    <svg
      fill="none"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject width={width} height={height}>
        <div {...{ xmlns: "http://www.w3.org/1999/xhtml" }}>
          <style>{`
              * {
                margin: 0;
                box-sizing: border-box;
              }

              @keyframes ticker-anim {
                0% { transform: translate3d(0%, 0, 0); }
                100% { transform: translate3d(calc(-50%), 0, 0); }
              }
              
              .ticker {
                display: inline-block;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                animation-duration: 10s;
                animation-play-state: paused;
                animation-name: ticker-anim;
              }
              
              .ticker:hover{
                animation-play-state: running;
              }
              
            `}</style>
          {children}
        </div>
      </foreignObject>
    </svg>
  );
};

export default ReadmeImg;
