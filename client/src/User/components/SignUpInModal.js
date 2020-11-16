import React from "react";
import { connect } from "react-redux";

//actions
import { signUp, signIn, signOut } from "../actions";

//style-related stuff
import { Modal, Form, Input, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

class SignUpInModal extends React.Component {
  state = { submitted: false };
  formRef = React.createRef();

  onFinish = (values) => {
    this.props.location.pathname === "/signUp"
      ? this.props.signUp(values).then(() => {
          if (this.props.userAuth.verified) {
            this.props.history.goBack();
          }
        })
      : this.props.signIn(values).then(() => {
          if (this.props.userAuth.verified) {
            this.props.history.goBack();
          }
        });
    this.setState({ submitted: true });
  };

  handleOk = () => {
    this.formRef.current.submit();
  };

  handleCancel = () => {
    this.formRef.current.resetFields();
    this.props.history.goBack();
  };

  render() {
    return (
      <Modal
        width="400px"
        closable={false}
        visible={true}
        onOk={this.handleOk}
        confirmLoading={this.props.userAuth.ongoing}
        onCancel={this.handleCancel}
        okText={
          this.props.location.pathname === "/signUp" ? "Add account" : "Sign In"
        }
      >
        <Form
          ref={this.formRef}
          name="authForm"
          onFinish={this.onFinish}
          onValuesChange={() => this.setState({ submitted: false })}
        >
          {this.props.location.pathname === "/signUp" && (
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          )}

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              placeholder="User-name"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          {this.props.location.pathname === "/signUp" && (
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="confirm password"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
          )}
        </Form>
        {this.state.submitted && this.props.userAuth.errMsg && (
          <Alert
            message={this.props.userAuth.errMsg}
            type="error"
            showIcon
            style={{ textAlign: "center" }}
          />
        )}
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return { userAuth: state.user.auth };
};
export default connect(mapStateToProps, {
  signUp: signUp,
  signIn: signIn,
  signOut: signOut,
})(SignUpInModal);
