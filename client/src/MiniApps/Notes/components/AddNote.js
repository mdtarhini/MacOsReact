import React from "react";
import { connect } from "react-redux";
import { addNote, editorUpdated, setNotesFilter } from "../actions";
import { Button } from "antd";
import { EditorState } from "draft-js";
import { FormOutlined } from "@ant-design/icons";

const AddNote = (props) => {
  return (
    <Button
      size="small"
      disabled={props.adding}
      className="osxButton"
      loading={props.adding}
      style={{
        fontSize: "13px",
        fontWeight: 500,
        borderRadius: "5px",
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        props.setNotesFilter("");
        props.editorUpdated(EditorState.createEmpty());
        props.addNote({
          title: "New Note",
          text: null,
          dateModified: new Date(),
          is_New: true,
        });
      }}
    >
      <FormOutlined />
    </Button>
  );
};
const mapStateToProps = (state) => {
  return { adding: state.requestingSomething.addingNote };
};
export default connect(mapStateToProps, {
  addNote: addNote,
  editorUpdated: editorUpdated,
  setNotesFilter: setNotesFilter,
})(AddNote);
