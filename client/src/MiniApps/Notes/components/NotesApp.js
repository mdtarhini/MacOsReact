import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import CloseMinExpand from "../../Common/CloseMinExpand";

import { SIZES, COLORS } from "../constants/index";
import NoteEditor from "./NoteEditor";
import ListOfNotes from "./ListOfNotes";
import EditorToolbar from "./EditorToolbar";
const { Header, Content, Sider } = Layout;

class NotesApp extends React.Component {
  state = { showSider: true };
  interactionToHideSider = () => {
    if (this.props.smallScreen) {
      this.setState({ showSider: false });
    }
  };
  render() {
    return (
      <Layout style={{ margin: 0, backgroundColor: "yellow" }}>
        <CloseMinExpand
          thirdIsBack={!this.state.showSider && this.props.smallScreen}
          onThirdClicked={() =>
            this.setState({ showSider: !this.state.showSider })
          }
        />
        <Header
          className="site-layout-background"
          style={{
            background:
              "linear-gradient(0deg, rgba(216,216,216,1) 0%, rgba(240,240,240,1) 100%)",
            padding: "5px",
            overflow: "hidden",
            height: SIZES.HEADER_HEIGHT,
            width: "100vw",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            borderBottom: COLORS.DIVIDER,
            left: 0,
            top: 0,
          }}
        >
          <EditorToolbar
            showSearchBarAndAddNote={this.state.showSider}
            showEditingTools={!(this.state.showSider && this.props.smallScreen)}
          />
        </Header>
        <Layout
          className="site-layout"
          style={{ margin: 0, backgroundColor: "yellow" }}
        >
          {this.state.showSider && (
            <Sider
              width={this.props.smallScreen ? "100vw" : SIZES.SIDER_WIDTH}
              style={{
                borderRight: `1px solid ${COLORS.DIVIDER}`,
                overflowY: "auto",
                overflowX: "hidden",
                height: `calc(100vh - ${SIZES.HEADER_HEIGHT}px)`,
                position: "fixed",
                zIndex: 1000,
                backgroundColor: COLORS.SIDEBAR,
                left: 0,
                top: SIZES.HEADER_HEIGHT,
              }}
            >
              <ListOfNotes onNoteClicked={this.interactionToHideSider} />
            </Sider>
          )}

          <Content
            style={{
              backgroundColor: "white",
              height: `calc(100vh - ${SIZES.HEADER_HEIGHT}px)`,
              overflowY: "auto",
              overflowX: "hidden",
              position: "fixed",
              top: SIZES.HEADER_HEIGHT,
              left: this.state.showSider ? SIZES.SIDER_WIDTH : 0,
            }}
          >
            {this.props.selectedNote !== "" && <NoteEditor />}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedNote: state.notes.selectedNote,
    smallScreen: state.smallScreen,
  };
};
export default connect(mapStateToProps)(NotesApp);
