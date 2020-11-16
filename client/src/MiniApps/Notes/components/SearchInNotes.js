import React from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { setNotesFilter, selectANote } from "../actions";
const SearchInNotes = (props) => {
  return (
    <Input
      size="small"
      placeholder="seacrh"
      prefix={<SearchOutlined />}
      value={props.notesFilter}
      onChange={(e) => {
        props.setNotesFilter(e.target.value);
        props.selectANote(0);
      }}
      style={{
        fontSize: "13px",
        fontWeight: 500,
        borderRadius: "5px",
      }}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    notesFilter: state.notes.notesFilter,
  };
};
export default connect(mapStateToProps, {
  setNotesFilter: setNotesFilter,
  selectANote: selectANote,
})(SearchInNotes);
