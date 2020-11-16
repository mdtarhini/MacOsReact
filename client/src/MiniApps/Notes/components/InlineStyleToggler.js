import React from "react";
import { connect } from "react-redux";
import { RichUtils } from "draft-js";
import { editorUpdated } from "../actions";
import { Button } from "antd";
import {
  UnderlineOutlined,
  BoldOutlined,
  ItalicOutlined,
} from "@ant-design/icons";

const inlineStyles = [
  {
    icon: <BoldOutlined />,
    style: "BOLD",
  },
  {
    icon: <ItalicOutlined />,
    style: "ITALIC",
  },
  {
    icon: <UnderlineOutlined />,
    style: "UNDERLINE",
  },
];

const InlineStyleToggler = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const styleButtons = inlineStyles.map((item, index) => {
    return (
      <Button
        key={index}
        size="small"
        className="osxButton"
        style={{
          fontSize: "13px",
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
  });
  return <>{styleButtons}</>;
};

const mapStateToProps = (state) => {
  return { editorState: state.notes.editorState };
};
export default connect(mapStateToProps, {
  editorUpdated: editorUpdated,
})(InlineStyleToggler);
