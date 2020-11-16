import React from "react";
import { Button } from "antd";

const OSXButton = () => {
  return (
    <Button
      size="small"
      className="osxButton"
      style={{
        fontSize: "16px",
        fontWeight: 500,
        color: currentStyle.has(item.style) ? "white" : "inherit",
        backgroundColor: currentStyle.has(item.style) ? "orange" : "",
        borderRadius: "5px",
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        props.editorUpdated(
          RichUtils.toggleInlineStyle(props.editorState, item.style)
        );
      }}
    >
      {item.icon}
    </Button>
  );
};
export default OSXButton;
