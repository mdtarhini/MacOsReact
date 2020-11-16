import React from "react";
import { connect } from "react-redux";
import { Typography, Tooltip, Divider } from "antd";
import { COLORS } from "./styles";
const { Title } = Typography;
const formatMessageTime = (date) => {
  let d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
class OneConversation extends React.Component {
  messagesEndRef = React.createRef();
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView();
  };
  formatDate = (date) => {
    let today = new Date();
    if (date === today.toLocaleDateString()) {
      return "Today";
    }
    return date;
  };
  renderMessages = () => {
    if (this.props.messages && this.props.messages.length > 0) {
      let currentLastDate = "";
      let printDate = false;
      return this.props.messages
        .filter((msg) => [msg.to, msg.from].includes(this.props.selectedConv))
        .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
        .map((msg, index) => {
          const msgDate = new Date(msg.sentAt);
          if (msgDate.toLocaleDateString() !== currentLastDate) {
            currentLastDate = msgDate.toLocaleDateString();
            printDate = true;
          } else {
            printDate = false;
          }

          return (
            <React.Fragment key={index}>
              {printDate && (
                <Divider
                  plain
                  className="messagesDate"
                  style={{
                    color: "transparent",
                    padding: "0px 20%",
                  }}
                >
                  <span>{this.formatDate(currentLastDate)}</span>
                </Divider>
              )}
              <Tooltip
                mouseEnterDelay={0.4}
                placement={
                  msg.from === this.props.auth.user._id ? "left" : "right"
                }
                title={formatMessageTime(msg.sentAt)}
                color={COLORS.DARKGREY}
                overlayClassName="messageTooltip"
              >
                <div
                  className={
                    msg.from === this.props.auth.user._id
                      ? "message from-me"
                      : "message from-them"
                  }
                >
                  <span>{msg.text}</span>
                </div>
              </Tooltip>

              <div className="break"></div>
            </React.Fragment>
          );
        });
    }
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          overflowX: "hidden",
          padding: "10px 0px",
        }}
      >
        {this.renderMessages()}
        {!this.props.selectedConv && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <Title level={3} style={{ color: COLORS.DARKGREY }}>
              No Conversation Selected
            </Title>
          </div>
        )}
        <div ref={this.messagesEndRef} />
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
export default connect(mapStateToProps)(OneConversation);
