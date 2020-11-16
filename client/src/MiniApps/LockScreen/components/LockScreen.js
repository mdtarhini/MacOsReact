import React from "react";
import { Spin, Row, Col, Typography, Space, Divider } from "antd";
import { connect } from "react-redux";
import { loadGuest, signOut } from "../../../User/actions";
import { editName } from "../../../User/actions";
import Option from "./Option";
import CloseMinExpand from "../../Common/CloseMinExpand";
import UserInfoItem from "./UserInfoItem";
import "./LockScreen.css";
import {
  UserOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { COLORS } from "./styles";
const { Title } = Typography;
class LockScreen extends React.Component {
  renderSpin = () => {
    return <Spin size="large" />;
  };

  renderOptions = () => {
    if (!this.props.userAuth.user) {
      return (
        <div>
          {this.props.history.location.pathname !== "/lock" && (
            <div
              style={{
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              <Title level={4} style={{ fontWeight: "300", color: "white" }}>
                Choose one of the follwing options:
              </Title>
            </div>
          )}
          <Row justify="space-around">
            <Col span={8}>
              <Option
                label="Sign up"
                func={() => this.props.history.push("/signUp")}
                color={COLORS.orange}
              >
                <UserAddOutlined />
              </Option>
            </Col>

            <Col span={8}>
              <Option
                label="Sign In"
                func={() => this.props.history.push("/signIn")}
                color={COLORS.blue}
              >
                <LoginOutlined />
              </Option>
            </Col>
            <Col span={8}>
              <Option
                label="Continue as guest"
                func={() => this.props.loadGuest()}
                color={COLORS.green}
              >
                <UserOutlined />
              </Option>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <Option
            label={this.props.userAuth.user.name}
            labelFunc="Sign out"
            func={() => this.props.signOut()}
            color={COLORS.red}
          >
            <UserOutlined />
          </Option>
          <Divider />
          <div style={{ textAlign: "left" }}>
            <Space direction="vertical">
              <UserInfoItem
                label="Name"
                text={this.props.userAuth.user.name}
                onEdit={
                  this.props.userAuth.user.username ? this.props.editName : null
                }
              />
              <UserInfoItem
                label="User-name"
                text={this.props.userAuth.user.username}
                onEdit={null}
              />
              <UserInfoItem
                label="User-Id"
                text={this.props.userAuth.user._id}
                onEdit={null}
                copyable
              />
            </Space>
          </div>
          <Divider />
        </div>
      );
    }
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <CloseMinExpand />
        {this.props.userAuth.ongoing && this.renderSpin()}
        {!this.props.userAuth.ongoing && this.renderOptions()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userAuth: state.user.auth };
};
export default connect(mapStateToProps, {
  loadGuest: loadGuest,
  signOut: signOut,
  editName: editName,
})(LockScreen);
