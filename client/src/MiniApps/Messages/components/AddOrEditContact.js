import React from "react";
import { connect } from "react-redux";
import { addContact } from "../../../User/actions";
import { setContactModal } from "../actions";

import { Modal, Input, Divider, Form, Tooltip, Alert } from "antd";

const dividerStyle = { color: "grey", fontSize: "small" };
class AddOrEditContact extends React.Component {
  formRef = React.createRef();
  state = {
    errorMessage: null,
  };

  onFinish = (values) => {
    let { name, username, userId } = values;
    // Make sure either the username or the user-id are provided
    if (username || userId) {
      if (!name) {
        name = username ? username : userId;
      }
      this.props.addContact({ name, username, userId });
      this.formRef.current.resetFields();
    } else {
      this.setState({ errorMessage: "No user-id/username were provided" });
    }
  };

  handleOk = () => {
    this.formRef.current.submit();
  };

  handleCancel = (e) => {
    // this.formRef.current.resetFields();
    this.props.setContactModal({ visible: false });
  };

  render() {
    return (
      <Modal
        width="400px"
        title={this.props.contactModal.title}
        visible={this.props.contactModal.visible}
        onOk={this.handleOk}
        confirmLoading={this.props.auth.ongoing}
        onCancel={this.handleCancel}
        destroyOnClose={true}
      >
        <Form
          ref={this.formRef}
          name="addContactForm"
          onFinish={this.onFinish}
          initialValues={this.props.contactModal.initialValues}
          onValuesChange={() => {
            this.setState({ errorMessage: "" });
          }}
        >
          <Form.Item name="name">
            <Input placeholder="Name" />
          </Form.Item>

          {this.props.contactModal.addUserNameField && (
            <>
              <Divider style={dividerStyle}>
                <span>with username</span>
              </Divider>
              <Form.Item name="username">
                <Input placeholder="username" />
              </Form.Item>
              <Divider style={dividerStyle}>
                <Tooltip
                  placement="topRight"
                  mouseEnterDelay={0.5}
                  title="A 24 characters long id provided uniquely for each user upon creating an account"
                >
                  <span>or user-id</span>
                </Tooltip>
              </Divider>
            </>
          )}

          <Form.Item name="userId">
            <Input
              placeholder="user-id"
              disabled={
                this.props.contactModal.initialValues &&
                this.props.contactModal.initialValues.userId
              }
            />
          </Form.Item>
          {this.state.errorMessage && (
            <Alert message={this.state.errorMessage} type="error" showIcon />
          )}
          {this.props.auth.errMsg && (
            <Alert message={this.props.auth.errMsg} type="error" showIcon />
          )}
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user.auth,
    contactModal: state.messages.contactModal,
  };
};
export default connect(mapStateToProps, {
  addContact: addContact,
  setContactModal: setContactModal,
})(AddOrEditContact);
