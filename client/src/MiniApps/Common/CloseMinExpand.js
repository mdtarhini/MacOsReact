import React from "react";
import history from "../../history";

//style-related stuff
import { Space, Tooltip } from "antd";
import {
  LeftCircleFilled,
  CloseCircleFilled,
  QuestionCircleFilled,
} from "@ant-design/icons";
import "./Common.css";

const iconSize = "16px";
const CloseMinExpand = (props) => {
  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    } else {
      history.push("/");
    }
  };
  const mutedButton = () => {
    return (
      <QuestionCircleFilled
        style={{
          fontSize: iconSize,
          color: "rgb(207,207,207)",
          backgroundColor: "rgb(207,207,207)",
          borderRadius: "50%",
        }}
      />
    );
  };
  const renderThirdButton = () => {
    if (props.thirdIsBack) {
      return (
        <Tooltip
          color="rgb(253, 148, 38)"
          title="hide sidebar"
          mouseEnterDelay={0.5}
        >
          <LeftCircleFilled
            style={{
              fontSize: iconSize,
              color: "rgb(253, 148, 38)",
            }}
            onClick={props.onThirdClicked}
          />
        </Tooltip>
      );
    } else {
      return mutedButton();
    }
  };
  return (
    <Space
      size="small"
      style={{ position: "absolute", left: "5px", top: "5px", zIndex: 900 }}
    >
      <CloseCircleFilled
        style={{ fontSize: iconSize, color: "rgb(252,98,93)" }}
        onClick={handleClose}
      />
      {mutedButton()}
      {renderThirdButton()}
    </Space>
  );
};
export default CloseMinExpand;
