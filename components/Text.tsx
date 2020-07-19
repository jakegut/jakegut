import React, { useRef, useEffect, useState } from "react";

const sizes = {
  default: 14,
  small: 12,
};

const colors = {
  default: "#7cc142",
  "gray-light": "#e1e4e8",
  gray: "#7cc142",
  "gray-dark": "#24292e",
};

const families = {
  default:
    "Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
  mono: "SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace",
};

const weights = {
  default: 400,
  bold: 600,
};

const Text: React.FC<any> = ({
  children = "",
  weight = "default",
  family = "default",
  color = "default",
  size = "default",
  ...props
}) => {


  return (
    <p
      style={{
        whiteSpace: "pre",
        fontSize: `${sizes[size]}px`,
        lineHeight: 1.5,
        fontFamily: families[family],
        color: colors[color],
        fontWeight: weights[weight],
        textOverflow: "ellipsis",
        overflow: "hidden"
      }}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
