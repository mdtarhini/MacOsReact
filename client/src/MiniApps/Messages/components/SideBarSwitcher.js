import React from "react";
import { connect } from "react-redux";
import { switchSidebarContent, selectConverstaion } from "../actions";
import { Button } from "antd";
import { COLORS, SIZES } from "./styles";
import { WechatFilled, ContactsFilled } from "@ant-design/icons";

const options = [
  { value: "chat", icon: <WechatFilled /> },
  { value: "contacts", icon: <ContactsFilled /> },
];
class SideBarSwitcher extends React.Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          bottom: "0px",
          borderTop: `1px solid ${COLORS.DIVIDER}`,
        }}
      >
        {options.map((option) => {
          return (
            <Button
              size="large"
              key={option.value}
              style={{
                height: SIZES.FOOTER_HEIGHT,
                width: "50%",
                fontSize: "large",
                fontWeight: 400,
                border: "none",
                borderRadius: "0px",
                color:
                  this.props.sideContent === option.value
                    ? "white"
                    : COLORS.DARKGREY,
                backgroundColor:
                  this.props.sideContent === option.value
                    ? COLORS.DARKGREY
                    : COLORS.SIDEBAR,
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                if (option.value !== this.props.sideContent) {
                  this.props.switchSidebarContent(option.value);
                  this.props.selectConverstaion(null);
                }
              }}
            >
              {option.icon}
            </Button>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { sideContent: state.messages.sideContent };
};
export default connect(mapStateToProps, {
  switchSidebarContent: switchSidebarContent,
  selectConverstaion: selectConverstaion,
})(SideBarSwitcher);
