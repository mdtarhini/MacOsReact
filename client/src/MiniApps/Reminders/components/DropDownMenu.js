import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
const DropDownMenu = ({ optionArray }) => {
  const menu = (
    <Menu>
      {optionArray.map((item, index) => {
        if (item.text === "---" && !item.icon && !item.func) {
          return <Menu.Divider key={index} />;
        } else {
          return (
            <Menu.Item
              key={index}
              icon={item.icon}
              onClick={() => {
                item.func && item.func();
              }}
            >
              <span>{item.text}</span>
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button
        type="link"
        size="small"
        className="ant-dropdown-link"
        style={{ padding: "0px" }}
        onClick={(e) => {
          // e.preventDefault();
          e.stopPropagation();
        }}
      >
        <i style={{ color: "grey" }}>
          <MoreOutlined />
        </i>
      </Button>
    </Dropdown>
  );
};
export default DropDownMenu;
