import React from "react";
import { Space } from "antd";
import { Link } from "react-router-dom";
import "./HomeApp.css";
const AppIcon = (props) => {
  const GetImg = () => {
    if (props.url) {
      return (
        <img
          src={props.url}
          style={{ width: props.size }}
          alt={props.label + "icon"}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Link to={props.path}>
      <Space direction="vertical" align="center" className="AppIcon">
        {GetImg()}
        {props.label}
      </Space>
    </Link>
  );
};
export default AppIcon;
