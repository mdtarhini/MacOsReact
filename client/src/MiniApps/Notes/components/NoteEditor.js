import React from "react";
import { connect } from "react-redux";
import { editorUpdated, patchNote } from "../actions";
import {
  Editor,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./BlockStyles.css";
import { SIZES } from "../constants";

class NoteEditor extends React.Component {
  editorRef = React.createRef();
  // TODO: This numberOfChanges needs to be changeged!!!
  state = { numberOfChanges: 0 };
  focus = () => {
    if (this.editorRef.current) this.editorRef.current.focus();
  };
  componentDidMount = () => {
    this.focus();
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.editorUpdated(newState);
      return true;
    }
    return false;
  };

  mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newState = RichUtils.onTab(
        e,
        this.props.editorState,
        4 /* maxDepth */
      );
      if (newState !== this.props.editorState) {
        this.props.editorUpdated(newState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  saveUpdates = () => {
    this.props.patchNote(this.props.selectedNote, {
      text: JSON.stringify(
        convertToRaw(this.props.editorState.getCurrentContent())
      ),
      dateModified: new Date(),
    });
  };
  render() {
    return (
      <div className="RichEditor-root" onClick={this.focus}>
        <div
          className="RichEditor-editor"
          style={{
            width: `calc(100vw - ${
              this.props.view === "standard" ? SIZES.SIDER_WIDTH : 0
            }px)`,
            height: `calc(100vh - ${SIZES.HEADER_HEIGHT}px)`,
            border: "none",
            padding: "10px",
            overflowY: "auto",
          }}
        >
          {this.props.selectedNote !== 0 && (
            <Editor
              placeholder="type here"
              blockStyleFn={(contentBlock) => contentBlock.getType()}
              editorState={this.props.editorState}
              onChange={(editorstate) => {
                this.props.editorUpdated(editorstate);
                this.setState({
                  numberOfChanges:
                    editorstate.getLastChangeType() === null
                      ? 0
                      : this.state.numberOfChanges + 1,
                });
                if (
                  this.state.numberOfChanges === 0 &&
                  editorstate.getLastChangeType() !== null
                ) {
                  this.saveUpdates();
                }
              }}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onBlur={this.saveUpdates}
              ref={this.editorRef}
              spellCheck={true}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editorState: state.notes.editorState,
    view: state.notes.view,
    selectedNote: state.notes.selectedNote,
    notes: state.notes.notes,
  };
};
export default connect(mapStateToProps, {
  editorUpdated: editorUpdated,
  patchNote: patchNote,
})(NoteEditor);
