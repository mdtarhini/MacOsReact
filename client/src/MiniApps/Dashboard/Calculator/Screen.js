import React from "react";

//other components
import { SIZES, COLORS } from "./constants";

const prettifyEquation = (equation) => {
  return equation
    .replace(/([%/*+-]+)/g, " $1 ")
    .replace(/\*/g, "×")
    .replace(/\//g, "÷");
};
const divStyle = {
  width: "100%",
  backgroundColor: COLORS.darkerGrey,
  padding: "2px 5px",
  display: "flex",
  justifyContent: "flex-end",
  overflow: "hidden",
  fontWeight: 200,
};

const getFontSize = (equation) => {
  if (equation.length < 9) return 35;
  else if (equation.length < 21) return 18;
  return (-29 / 288) * equation.length + 749 / 24 - 15;
};
const Screen = (props) => {
  return (
    <React.Fragment>
      <div
        style={{
          ...divStyle,
          height: (1 * SIZES.screenHeight) / 3 + "px",
          paddingTop: "13px",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        <p style={{ fontSize: "11px", color: "whitesmoke" }}>
          {prettifyEquation(props.oldEquation)}
        </p>
      </div>
      <div
        style={{
          ...divStyle,
          height: (2 * SIZES.screenHeight) / 3 + "px",
          alignItems: "flex-end",
          fontSize: getFontSize(props.equation) + "px",
          color: "white",
        }}
      >
        {prettifyEquation(props.equation)}
      </div>
    </React.Fragment>
  );
};
export default Screen;
