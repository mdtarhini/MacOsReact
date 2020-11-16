import React from "react";

//style-related stuff
import { SIZES, BUTTONS, COLORS } from "./constants";
import { Row, Col } from "antd";

//other components
import OneButton from "./OneButton";

class Buttons extends React.Component {
  render() {
    return (
      <Row
        style={{
          height: 5 * SIZES.buttonHeight + "px",
          width: "100%",
          borderLeft: `1px solid ${COLORS.darkerGrey}`,
        }}
      >
        {BUTTONS.map((button) => {
          if (button.value === "ac") {
            return { ...button, label: this.props.replace ? "AC" : "C" };
          }
          return button;
        }).map((button, index) => {
          return (
            <Col
              key={index}
              flex={`${button.span * 25}%`}
              style={{
                height: SIZES.buttonHeight + "px",
                backgroundColor:
                  button.type === "top"
                    ? COLORS.darkGrey
                    : button.type === "right"
                    ? COLORS.orange
                    : COLORS.grey,
                border: `1px solid ${COLORS.darkerGrey}`,
                borderLeft: "none",
                borderTop: "none",
                display: "flex",
                fontSize:
                  button.type === "top"
                    ? "20px"
                    : button.type === "right"
                    ? "27px"
                    : "22px",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() =>
                this.props.onAButtonClick(button.value, button.type)
              }
            >
              <OneButton label={button.label} />
            </Col>
          );
        })}
      </Row>
    );
  }
}
export default Buttons;
