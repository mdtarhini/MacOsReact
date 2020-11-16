import React from "react";
import { connect } from "react-redux";
import { COLORS, SIZES } from "./styles";
import { Row, Col, Space, Avatar, Badge, Spin } from "antd";
import { fetchMessages, selectConverstaion } from "../actions";
import {
  UserOutlined,
  CheckOutlined,
  ContactsFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { formatDate, ellipseAText } from "../../Common/Helpers";
import SearchInMessages from "./SearchInMessages";
import _ from "lodash";

const spinningBin = (
  <DeleteFilled style={{ fontSize: 15, color: "red" }} spin />
);

class Conversations extends React.Component {
  componentDidMount = () => {
    this.props.fetchMessages();
  };
  getLastMessageFromContact = (contact) => {
    const lastMsg = this.props.messages
      .filter((msg) => msg.to === contact || msg.from === contact)
      .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))[0];

    return [lastMsg.text, lastMsg.sentAt, lastMsg.from === contact];
  };
  getNumberOfUnseenMessages = (contact) => {
    return this.props.messages.filter(
      (msg) => msg.from === contact && !msg.isSeen
    ).length;
  };
  render() {
    const contacts = this.props.auth.user.contacts;
    if (this.props.messages) {
      return (
        <div>
          <SearchInMessages />
          {this.props.messages &&
            this.props.messages.length > 0 &&
            Object.keys(
              _.keyBy(
                this.props.messages.map((msg) => {
                  return {
                    ...msg,
                    contact:
                      msg.to === this.props.auth.user._id ? msg.from : msg.to,
                  };
                }),
                "contact"
              )
            )

              .filter((contact) => {
                if (this.props.messagesFilter === "") return true;
                return contacts && contacts[contact]
                  ? contacts[contact].includes(this.props.messagesFilter)
                  : false;
              })
              .filter((contact) => contact !== "undefined")
              .map((contact) => {
                const [
                  lastMsgText,
                  lastMsgDate,
                  lastMsgIsReceived,
                ] = this.getLastMessageFromContact(contact);
                return {
                  contact: contact,
                  name:
                    contacts && contacts[contact] ? contacts[contact] : contact,
                  lastMsgText,
                  lastMsgDate,
                  lastMsgIsReceived,
                  nUnseen: this.getNumberOfUnseenMessages(contact),
                };
              })
              .sort((a, b) => new Date(b.lastMsgDate) - new Date(a.lastMsgDate))
              .map((item) => {
                return (
                  <div
                    key={item.contact}
                    className="sideContentListItem"
                    onClick={() => {
                      this.props.selectConverstaion(item.contact);
                      this.props.onConversationClicked();
                    }}
                    style={{
                      padding: "10px",
                      borderBottom: `1px solid ${COLORS.DIVIDER}`,
                      width: "100%",
                      backgroundColor:
                        this.props.selectedConv === item.contact
                          ? COLORS.SELECTION
                          : "inherit",
                      color:
                        this.props.selectedConv === item.contact
                          ? "white"
                          : "inherit",
                    }}
                  >
                    <Row justify="space-between">
                      <Col>
                        <Space>
                          <Avatar icon={<UserOutlined />} />
                          <Space direction="vertical" size={2}>
                            <span
                              style={{
                                fontWeight: 600,
                              }}
                            >
                              {ellipseAText(item.name, 16)}
                            </span>
                            <span style={{ fontSize: "small" }}>
                              {item.lastMsgIsReceived === false && (
                                <span style={{ marginRight: "2px" }}>
                                  <CheckOutlined></CheckOutlined>
                                </span>
                              )}
                              {ellipseAText(item.lastMsgText, 12)}
                            </span>
                          </Space>
                        </Space>
                      </Col>
                      <Col>
                        {this.props.deleting && (
                          <Spin indicator={spinningBin} />
                        )}
                        {!this.props.deleting && (
                          <Space
                            direction="vertical"
                            size={2}
                            style={{ textAlign: "right" }}
                          >
                            <span style={{ fontSize: "small" }}>
                              {formatDate(item.lastMsgDate)}
                            </span>
                            {this.props.selectedConv !== item.contact && (
                              <Badge count={item.nUnseen} size="small" />
                            )}
                          </Space>
                        )}
                      </Col>
                    </Row>
                  </div>
                );
              })}
          {this.props.messages && this.props.messages.length === 0 && (
            <div
              style={{
                paddingTop: SIZES.HEADER_HEIGHT / 2,
                width: "100%",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>No conversations!</p>
              <p style={{ fontSize: "small" }}>
                Select contact from
                <span style={{ margin: "0px 5px" }}>
                  <ContactsFilled />
                </span>
                to start new conversations.
              </p>
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    deleting: state.requestingSomething.deletingChat,
    auth: state.user.auth,
    messagesFilter: state.messages.messagesFilter,
    messages: state.messages.messages,
    selectedConv: state.messages.selectedConv,
  };
};
export default connect(mapStateToProps, {
  fetchMessages: fetchMessages,
  selectConverstaion: selectConverstaion,
})(Conversations);
