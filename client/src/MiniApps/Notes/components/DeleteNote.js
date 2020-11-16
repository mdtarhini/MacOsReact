import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteNote, selectANote } from "../actions";
const { confirm } = Modal;

const DeleteNote = (props) => {
  const showDeleteConfirm = (noteId, noteName) => {
    confirm({
      title: `Are you sure you want to delete "${noteName}" ?`,
      icon: <ExclamationCircleOutlined />,
      // content: "This will delete all reminders in this list.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        props.deleteNote(noteId).then(() => {
          props.selectANote(0);
        });
      },
      onCancel() {},
    });
  };
  return (
    <Button
      loading={props.deleting}
      disabled={props.deleting}
      size="small"
      className="osxButton"
      style={{
        fontSize: "13px",
        fontWeight: 500,
        borderRadius: "5px",
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        if (props.notes[props.selectedNote]) {
          if (props.notes[props.selectedNote].text === null) {
            props.deleteNote(props.selectedNote).then(() => {
              props.selectANote(0);
            });
          } else {
            showDeleteConfirm(
              props.selectedNote,
              props.notes[props.selectedNote].title
            );
          }
        }
      }}
    >
      <DeleteOutlined />
    </Button>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedNote: state.notes.selectedNote,
    notes: state.notes.notes,
    deleting: state.requestingSomething.deletingNote,
  };
};
export default connect(mapStateToProps, {
  deleteNote: deleteNote,
  selectANote: selectANote,
})(DeleteNote);
