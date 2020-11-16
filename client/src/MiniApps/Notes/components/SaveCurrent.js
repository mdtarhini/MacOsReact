import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { patchNote } from "../actions";
import { convertToRaw } from "draft-js";
const SaveCurrent = (props) => {
  return (
    <Button
      size="small"
      loading={props.saving}
      disabled={props.saving}
      className="osxButton"
      style={{
        fontSize: "13px",
        fontWeight: 500,
        borderRadius: "5px",
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        props.patchNote(props.selectedNote, {
          text: JSON.stringify(
            convertToRaw(props.editorState.getCurrentContent())
          ),
          dateModified: new Date(),
        });
      }}
    >
      <SaveOutlined />
    </Button>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedNote: state.notes.selectedNote,
    editorState: state.notes.editorState,
    saving: state.requestingSomething.editingNote,
  };
};
export default connect(mapStateToProps, { patchNote: patchNote })(SaveCurrent);
