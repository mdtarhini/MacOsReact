import React from "react";
import { Avatar, Space, Button } from "antd";
import { COLORS } from "./styles";

const Option = (props) => {
  return (
    <Space
      direction="vertical"
      align="center"
      className={`lockScreenOption ${props.labelFunc ? "" : "clickable"}`}
      onClick={props.labelFunc ? null : props.func}
      style={{ margin: "0px 30px", textAlign: "center" }}
    >
      <Avatar
        size={80}
        icon={props.children}
        style={{ backgroundColor: props.color }}
      />
      <Space direction="vertical" size={0}>
        <span
          style={{
            fontWeight: props.labelFunc ? "bold" : "normal",
            color: "white",
          }}
        >
          {props.label}
        </span>
        {props.labelFunc && (
          <Button type="link" onClick={props.func}>
            <span style={{ color: COLORS.red }}>{props.labelFunc}</span>
          </Button>
        )}
      </Space>
    </Space>
  );
};
export default Option;
