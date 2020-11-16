import React from "react";
import { Typography } from "antd";
import { COLORS, SIZES } from "./styles";
const NoMatch = () => {
  return (
    <div>
      <div
        style={{
          height: `${SIZES.topFraction}vh`,
          width: "100vw",
          backgroundColor: COLORS.topPanel,
          color: COLORS.text,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "10vw",
          }}
        >
          404
        </span>
      </div>
      <div
        style={{
          height: `${100 - SIZES.topFraction}vh`,
          width: "100vw",
          backgroundColor: COLORS.bottomPanel,
          color: "black",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      ></div>
    </div>
  );
};
export default NoMatch;
