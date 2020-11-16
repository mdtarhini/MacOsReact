import React from "react";
import { Row, Col } from "antd";
const SideWidget = ({
  isActive,
  activeColor,
  inactiveColor,
  onClick,
  label,
  counter,
  children,
}) => {
  const colors = {
    text: isActive ? "white" : "grey",
    icon: isActive ? "white" : activeColor,
    bnackground: isActive ? activeColor : inactiveColor,
  };
  return (
    <div
      className="SideWidgetOuterDiv"
      onClick={onClick}
      style={{
        padding: "3px 8px",
        backgroundColor: colors.bnackground,
        borderRadius: "7px",
        color: colors.text,
      }}
    >
      <Row justify="space-between">
        <Col span="12">
          <i style={{ fontSize: "20px", color: colors.icon }}>{children}</i>
        </Col>
        <Col span="12" style={{ textAlign: "end" }}>
          <span style={{ fontSize: "20px", fontWeight: 500 }}>{counter}</span>
        </Col>
        <Col span="12">
          <span style={{ fontSize: "13px", fontWeight: 500 }}>{label}</span>
        </Col>
      </Row>
    </div>
  );
};
export default SideWidget;
