import React from "react";
import { Input } from "antd";
import { connect } from "react-redux";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import socketIOClient from "socket.io-client";
import { loadUserByToken } from "../../../User/actions";
import { messageReceived, messageSent } from "../actions";
import { SIZES, COLORS } from "./styles";
const { TextArea } = Input;

class FooterContent extends React.Component {
  socket = null;
  inputRef = React.createRef();
  componentDidMount = () => {
    this.props.loadUserByToken().then(() => {
      this.socket = socketIOClient();
      this.socket.emit("identification", this.props.auth.user._id);

      this.socket.on("reconnection", this.onReconnection);
      this.socket.on("message", this.onMessageReceived);
    });
  };
  onReconnection = () => {
    if (this.props.auth.user) {
      this.socket.emit("identification", this.props.auth.user._id);
    }
  };
  onMessageReceived = (msg) => {
    this.props.messageReceived(msg);
  };
  state = { value: "" };
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };
  sendMessage = () => {
    if (this.state.value) {
      const msg = {
        to: this.props.selectedConv,
        text: this.state.value,
        sentAt: new Date(),
        isSeen: false,
        from: this.props.auth.user._id,
      };

      // send it via socket
      this.socket.emit("message", msg);
      // for a prompt visualisation, add it temporarly to the state
      this.props.messageSent(msg);
      this.setState({ value: "" });
    }
    this.inputRef.current.focus();
  };
  renderInput = () => {
    return (
      <div
        style={{
          backgroundColor: COLORS.SIDEBAR,
          borderTop: `1px solid ${COLORS.DIVIDER}`,
          position: "absolute",
          display: "flex",
          bottom: "0px",
          minHeight: SIZES.FOOTER_HEIGHT + "px",
          width: "100%",
          padding: "5px",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <TextArea
          ref={this.inputRef}
          value={this.state.value}
          autoFocus
          onChange={this.onChange}
          disabled={!this.props.selectedConv}
          placeholder="Write a message..."
          autoSize={{ minRows: 1, maxRows: 5 }}
          onPressEnter={(e) => {
            e.preventDefault();
            this.sendMessage();
          }}
          style={{
            borderRadius: "20px",
            marginRight: "3px",
            resize: "none",
          }}
        ></TextArea>
        <Button
          type="primary"
          shape="circle"
          disabled={!this.props.selectedConv}
          onClick={this.sendMessage}
        >
          <SendOutlined />
        </Button>
      </div>
    );
  };
  render() {
    return <>{this.props.selectedConv && this.renderInput()}</>;
  }
}
const mapStateToProps = (state) => {
  return { auth: state.user.auth, selectedConv: state.messages.selectedConv };
};
export default connect(mapStateToProps, {
  loadUserByToken: loadUserByToken,
  messageReceived: messageReceived,
  messageSent: messageSent,
})(FooterContent);
