import React from "react";

//style-related stuff
import { Menu, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const DropDownMenu = ({ optionArray, shape }) => {
  const menu = (
    <Menu>
      {optionArray.map((item, index) => {
        if (item) {
          if (item.isModalTrigger) {
            return <React.Fragment key={index}>{item.trigger}</React.Fragment>;
          } else if (item.text === "---" && !item.icon && !item.func) {
            return <Menu.Divider key={index} />;
          } else {
            return (
              <Menu.Item
                key={index}
                icon={item.icon}
                onClick={({ domEvent }) => {
                  domEvent.stopPropagation();
                  item.func && item.func();
                }}
              >
                <span>{item.text}</span>
              </Menu.Item>
            );
          }
        }
        return null;
      })}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button
        type={shape ? "" : "link"}
        shape={shape ? shape : ""}
        size="small"
        className="ant-dropdown-link"
        style={{ padding: "0px" }}
        onClick={(e) => {
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
