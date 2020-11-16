import React from "react";
import { Typography, Space, Input } from "antd";

import {
  EditFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { COLORS } from "./styles";

const { Text } = Typography;
class UserInfoItem extends React.Component {
  state = { editing: false, text: this.props.text };
  handleEditInit = () => {
    this.setState({ editing: true });
  };
  handleEditSubmit = () => {
    this.props.onEdit(this.state.text);
  };
  render = () => {
    if (this.props.text) {
      return (
        <Space>
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {this.props.label + ":"}
          </Text>
          {!this.state.editing && (
            <Text style={{ color: "white" }} copyable={this.props.copyable}>
              {this.props.text}
            </Text>
          )}
          {this.state.editing && (
            <Input
              value={this.state.text}
              size="small"
              onChange={(e) => this.setState({ text: e.target.value })}
              style={{ backgroundColor: COLORS.darkGray }}
              autoFocus
            />
          )}
          {this.props.onEdit && !this.state.editing && (
            <EditFilled
              onClick={() => this.handleEditInit()}
              style={{ color: COLORS.blue }}
            />
          )}
          {this.state.editing && (
            <Space>
              <CheckCircleOutlined
                style={{ color: COLORS.blue }}
                onClick={this.handleEditSubmit}
              />
              <CloseCircleOutlined
                style={{ color: COLORS.red }}
                onClick={() => {
                  this.setState({ editing: false });
                }}
              />
            </Space>
          )}
        </Space>
      );
    }
    return null;
  };
}
export default UserInfoItem;
