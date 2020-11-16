import React from "react";
import { Space, Input, Spin } from "antd";
import { connect } from "react-redux";
import { selectANote, fetchNotes, patchNote, editorUpdated } from "../actions";
import { EditorState, convertFromRaw } from "draft-js";
import { COLORS } from "../constants";
const ellipseAText = (text, numberOfChars) => {
  return `${text.slice(0, numberOfChars)}${
    text.length > numberOfChars ? "..." : ""
  }`;
};
const listHeaderStyle = {
  width: "100%",
  textAlign: "center",
  paddingTop: "30px",
  fontSize: "22px",
  fontWeight: "600",
  color: COLORS.DARKGREY,
};
const formatDate = (strDate) => {
  const date = new Date(strDate);
  const now = new Date();

  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  ) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return date.toLocaleDateString([], {
      month: "short",
      year: "numeric",
      day: "numeric",
    });
  }
};
class ListOfNotes extends React.Component {
  state = { newNoteInput: "" };
  componentDidMount = () => {
    this.props.fetchNotes();
  };

  onInputChanged = (noteId) => {
    this.props.patchNote(noteId, {
      title: this.state.newNoteInput ? this.state.newNoteInput : "New Note",
      is_New: false,
    });
    this.setState({ newNoteInput: "" });
  };
  notesInList = () => {
    if (this.props.notes) {
      return Object.values(this.props.notes)
        .filter((note) => {
          if (this.props.notesFilter !== "") {
            const noteRawContent =
              JSON.parse(note.text) && JSON.parse(note.text)["blocks"]
                ? JSON.parse(note.text)["blocks"].reduce(
                    (totalString, item) => totalString + " " + item.text,
                    ""
                  )
                : "";

            return (note.title + noteRawContent).includes(
              this.props.notesFilter
            );
          }
          return true;
        })
        .sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified))
        .map((note) => {
          return (
            <div
              key={note._id}
              onClick={() => {
                this.props.onNoteClicked();
                this.props.selectANote(note._id);
                this.props.editorUpdated(
                  note.text
                    ? EditorState.createWithContent(
                        convertFromRaw(JSON.parse(note.text))
                      )
                    : EditorState.createEmpty()
                );
              }}
              className="notesInList"
              style={{
                padding: "5px 0",
                borderBottom: `1px solid ${COLORS.DIVIDER}`,
                backgroundColor:
                  this.props.selectedNote === note._id
                    ? COLORS.SELECTION
                    : "inherit",
                color:
                  this.props.selectedNote === note._id ? "white" : "inherit",
              }}
            >
              <Space
                direction="vertical"
                size={1}
                style={{ padding: "0 10px 0 20px" }}
              >
                {note.is_New && (
                  <Input
                    placeholder={note.title}
                    bordered={false}
                    style={{ color: "whitesmoke" }}
                    value={this.state.newNoteInput}
                    onChange={(e) =>
                      this.setState({ newNoteInput: e.target.value })
                    }
                    autoFocus
                    onBlur={() => this.onInputChanged(note._id)}
                    onPressEnter={() => {
                      this.props.onNoteClicked();
                      this.onInputChanged(note._id);
                    }}
                  />
                )}
                {!note.is_New && (
                  <span style={{ fontWeight: 700 }}>
                    {ellipseAText(note.title, 30)}
                  </span>
                )}
                <Space size="small">
                  <span style={{ fontSize: "smaller" }}>
                    {formatDate(note.dateModified)}
                  </span>
                  {/* <span style={{ fontSize: "11px" }}>
                    {note.text && ellipseAText(note.text, 15)}
                  </span> */}
                </Space>
              </Space>
            </div>
          );
        });
    } else {
      return <div>Loading</div>;
    }
  };
  render() {
    if (this.props.fetching) {
      return (
        <div style={listHeaderStyle}>
          <Spin />
        </div>
      );
    } else if (
      this.notesInList().length === 0 &&
      this.props.notesFilter === ""
    ) {
      return <div style={listHeaderStyle}>No Notes</div>;
    } else {
      return (
        <React.Fragment>
          {this.props.notesFilter !== "" && (
            <div
              style={{
                ...listHeaderStyle,
                borderBottom: `1px solid ${COLORS.DIVIDER}`,
              }}
            >{`Results for "${this.props.notesFilter}"`}</div>
          )}
          <div>{this.notesInList()}</div>
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    fetching: state.requestingSomething.fetchingNotes,
    selectedNote: state.notes.selectedNote,
    notesFilter: state.notes.notesFilter,
    notes: state.notes.notes,
  };
};
export default connect(mapStateToProps, {
  selectANote: selectANote,
  fetchNotes: fetchNotes,
  patchNote: patchNote,
  editorUpdated: editorUpdated,
})(ListOfNotes);
