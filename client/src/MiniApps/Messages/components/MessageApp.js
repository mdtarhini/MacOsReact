import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { COLORS, SIZES } from "./styles";
import FooterContent from "./FooterContent";
import ContactInfo from "./ContactInfo";
import CloseMinExpand from "../../Common/CloseMinExpand";

import "./MessageApp.css";
import SideBarSwitcher from "./SideBarSwitcher";

import Conversations from "./Conversations";
import OneConversation from "./OneConversation";
import AddOrEditContact from "./AddOrEditContact";

import Contacts from "./Contacts";
const { Sider, Content } = Layout;

class MessageApp extends React.Component {
  state = {
    showSider: true,
  };
  interactionToHideSider = () => {
    if (this.props.smallScreen) {
      this.setState({ showSider: false });
    }
  };
  render() {
    return (
      <Layout>
        <AddOrEditContact />
        <CloseMinExpand
          thirdIsBack={!this.state.showSider && this.props.smallScreen}
          onThirdClicked={() =>
            this.setState({ showSider: !this.state.showSider })
          }
        />
        <ContactInfo
          width={
            this.state.showSider
              ? `calc(100vw - ${SIZES.SIDEBAR_WIDTH}px)`
              : "100vw"
          }
          left={this.state.showSider ? `${SIZES.SIDEBAR_WIDTH}px` : 0}
        />
        {this.state.showSider && (
          <Sider
            width={this.props.smallScreen ? "100vw" : SIZES.SIDEBAR_WIDTH}
            style={{
              backgroundColor: COLORS.SIDEBAR,
              overflow: "auto",
              height: "100%",
              position: "fixed",
              zIndex: 200,
              borderRight: `1px solid ${COLORS.DIVIDER}`,
              left: 0,
            }}
          >
            {this.props.sideContent === "contacts" && (
              <Contacts onContactClicked={this.interactionToHideSider} />
            )}
            {this.props.sideContent === "chat" && (
              <Conversations
                onConversationClicked={this.interactionToHideSider}
              />
            )}
            <SideBarSwitcher />
          </Sider>
        )}
        <Content
          style={{
            backgroundColor: "white",
            wordWrap: "break-word",
            position: "fixed",
            top: `${SIZES.HEADER_HEIGHT}px`,
            left: this.state.showSider ? `${SIZES.SIDEBAR_WIDTH}px` : 0,
            height: `calc(100% - ${SIZES.HEADER_HEIGHT}px)`,
            width: this.state.showSider
              ? `calc(100% - ${SIZES.SIDEBAR_WIDTH}px)`
              : "100%",
          }}
        >
          <div
            style={{
              overflowY: "auto",
              height: `calc(100% - ${SIZES.FOOTER_HEIGHT}px)`,
            }}
          >
            <OneConversation />
          </div>

          <FooterContent />
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sideContent: state.messages.sideContent,
    smallScreen: state.smallScreen,
  };
};
export default connect(mapStateToProps)(MessageApp);
