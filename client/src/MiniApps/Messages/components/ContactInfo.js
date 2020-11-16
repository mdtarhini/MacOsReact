import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { COLORS, SIZES } from "./styles";
import { Row, Col, Space, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import DeleteConversation from "./DeleteConversation";
import { deleteConversation, setContactModal } from "../actions";
const { Header } = Layout;

const ContactInfo = (props) => {
  if (props.selectedConv) {
    let contacts = props.auth.user.contacts;
    if (!contacts) contacts = {};
    return (
      <Header
        style={{
          backgroundColor: COLORS.SIDEBAR,
          borderBottom: `1px solid ${COLORS.DIVIDER}`,
          position: "fixed",
          top: "0",
          paddingLeft: "5px",
          paddingRight: "5px",
          paddingTop: props.left === 0 ? "8px" : "",
          height: `${SIZES.HEADER_HEIGHT}px`,
          left: props.left,
          width: props.width,
        }}
      >
        <Row justify="space-between">
          <Col>
            <Space>
              <Avatar
                icon={<UserOutlined />}
                size={props.left === 0 ? "small" : "large"}
              />
              <span
                style={{
                  fontWeight: 500,
                  color: COLORS.DARKGREY,
                  fontSize:
                    contacts && contacts[props.selectedConv] ? "16px" : "14px",
                }}
              >
                {contacts && contacts[props.selectedConv]
                  ? contacts[props.selectedConv]
                  : props.selectedConv}
              </span>
              {!contacts[props.selectedConv] && (
                <Button
                  type="link"
                  onClick={() => {
                    props.setContactModal({
                      title: "Add contact",
                      visible: true,
                      addUserNameField: false,
                      initialValues: {
                        userId: props.selectedConv,
                        name: "",
                      },
                    });
                  }}
                >
                  Save in contacts ?
                </Button>
              )}
            </Space>
          </Col>
          <Col>
            <DeleteConversation />
          </Col>
        </Row>
      </Header>
    );
  } else {
    return (
      <Header
        style={{
          backgroundColor: "white",
          position: "fixed",
          top: "0",
          height: `${SIZES.HEADER_HEIGHT}px`,
          left: props.left,
          width: props.width,
        }}
      ></Header>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    auth: state.user.auth,
    selectedConv: state.messages.selectedConv,
  };
};
export default connect(mapStateToProps, {
  deleteConversation: deleteConversation,
  setContactModal: setContactModal,
})(ContactInfo);
