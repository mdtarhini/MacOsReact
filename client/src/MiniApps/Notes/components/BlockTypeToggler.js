import React from "react";
import { connect } from "react-redux";
import { RichUtils } from "draft-js";
import { Menu, Dropdown, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { editorUpdated } from "../actions";
const blockTypes = [
  {
    label: "Title",
    style: "header-one",
    styleInMenu: { fontSize: "16px", fontWeight: "600" },
  },
  {
    label: "Heading",
    style: "header-two",
    styleInMenu: { fontSize: "15px", fontWeight: "500" },
  },
  {
    label: "Subheading",
    style: "header-three",
    styleInMenu: { fontSize: "13px", fontWeight: "400" },
  },
  {
    label: "body",
    style: "unstyled",
    styleInMenu: { fontSize: "12px", fontWeight: "400" },
  },
  {
    label: ".Bulleted list",
    style: "unordered-list-item",
    styleInMenu: { fontSize: "12px", fontWeight: "400" },
  },
  {
    label: "1. Numbered list",
    style: "ordered-list-item",
    styleInMenu: { fontSize: "12px", fontWeight: "400" },
  },
];

class BlockTypeToggler extends React.Component {
  getCurrentBlockStyle = () => {
    const selection = this.props.editorState.getSelection();
    return this.props.editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  };
  renderMenu = () => {
    return blockTypes.map((item, index) => {
      return (
        <Menu.Item
          key={index}
          icon={
            item.style === this.getCurrentBlockStyle() ? (
              <CheckOutlined />
            ) : null
          }
          onMouseDown={(e) => {
            e.preventDefault();
            this.props.editorUpdated(
              RichUtils.toggleBlockType(this.props.editorState, item.style)
            );
          }}
        >
          <span style={item.styleInMenu}>{item.label}</span>
        </Menu.Item>
      );
    });
  };
  render() {
    return (
      <Dropdown overlay={<Menu>{this.renderMenu()}</Menu>} trigger={["click"]}>
        <Button
          onClick={(e) => e.preventDefault()}
          size="small"
          className="osxButton"
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "rgb(60,60,60)",
            borderRadius: "5px",
          }}
        >
          Aa
        </Button>
      </Dropdown>
    );
  }
}
const mapStateToProps = (state) => {
  return { editorState: state.notes.editorState };
};
export default connect(mapStateToProps, {
  editorUpdated: editorUpdated,
})(BlockTypeToggler);
