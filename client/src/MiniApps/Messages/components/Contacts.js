import React from "react";
import { connect } from "react-redux";
import { fetchMessages, selectConverstaion, setContactModal } from "../actions";
import { deleteContact } from "../../../User/actions";
import { COLORS, SIZES } from "./styles";
import { Space, Avatar, Button, Row, Col, Modal } from "antd";
import { ellipseAText } from "../../Common/Helpers";
import {
  UserOutlined,
  UserAddOutlined,
  EditFilled,
  DeleteFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import DropDownMenu from "../../Common/DropDownMenu";
const { confirm } = Modal;
class Contacts extends React.Component {
  showDeleteConfirm = (contactId) => {
    confirm({
      title: `Are you sure you want to delete this contact ?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.props.deleteContact(contactId);
        this.props.selectConverstaion(null);
      },
    });
  };
  renderContacts = () => {
    const contacts = this.props.auth.user.contacts;
    if (contacts) {
      return Object.keys(contacts)
        .sort((a, b) => contacts[a] - contacts[b])
        .map((contactId) => {
          return (
            <div
              key={contactId}
              className="sideContentListItem"
              onClick={() => {
                this.props.selectConverstaion(contactId);
                this.props.onContactClicked();
              }}
              style={{
                padding: "10px",
                borderBottom: `1px solid ${COLORS.DIVIDER}`,
                width: "100%",
                backgroundColor:
                  this.props.selectedConv === contactId
                    ? COLORS.SELECTION
                    : "inherit",
                color:
                  this.props.selectedConv === contactId ? "white" : "inherit",
              }}
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <Space>
                    <Avatar icon={<UserOutlined />} />
                    <span style={{ fontWeight: 500 }}>
                      {ellipseAText(contacts[contactId], 28)}
                    </span>
                  </Space>
                </Col>
                <Col>
                  <DropDownMenu
                    optionArray={[
                      {
                        text: "Edit",
                        icon: <EditFilled />,
                        func: () => {
                          this.props.setContactModal({
                            title: "Edit contact",
                            visible: true,
                            addUserNameField: false,
                            initialValues: {
                              userId: contactId,
                              name: contacts[contactId],
                            },
                          });
                        },
                      },
                      {
                        text: "---",
                      },
                      {
                        text: "Delete",
                        icon: <DeleteFilled />,
                        func: () => {
                          this.showDeleteConfirm(contactId);
                        },
                      },
                    ]}
                  />
                </Col>
              </Row>
            </div>
          );
        });
    } else {
      return (
        <div
          style={{
            paddingTop: SIZES.HEADER_HEIGHT / 2,
            width: "100%",
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          <p style={{ fontWeight: "bold" }}>No contacts!</p>
        </div>
      );
    }
  };
  render() {
    return (
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            paddingLeft: "20px",
            paddingTop: SIZES.HEADER_HEIGHT / 2,
            borderBottom: `1px solid ${COLORS.DIVIDER}`,
            width: "100%",
            height: SIZES.HEADER_HEIGHT,
          }}
        >
          <Space>
            <UserAddOutlined />
            <Button
              type="link"
              onClick={(e) => {
                e.stopPropagation();
                this.props.setContactModal({
                  title: "Add a new contact",
                  visible: true,
                  addUserNameField: true,
                  initialValues: {},
                });
              }}
            >
              Add new contact
            </Button>
          </Space>
        </div>
        {this.renderContacts()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user.auth,
    messages: state.messages.messages,
    selectedConv: state.messages.selectedConv,
  };
};
export default connect(mapStateToProps, {
  fetchMessages: fetchMessages,
  selectConverstaion: selectConverstaion,
  setContactModal: setContactModal,
  deleteContact: deleteContact,
})(Contacts);
