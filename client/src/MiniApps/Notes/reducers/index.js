import { combineReducers } from "redux";
import { EditorState } from "draft-js";
import _ from "lodash";
import {
  SELECT_NOTE,
  EDITOR_UPDATED,
  ADD_NOTE,
  FETCH_NOTES,
  DELETE_NOTE,
  PATCH_NOTE,
  SET_NOTES_FILTER,
} from "../actions/types";

const notesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_NOTES:
      return _.keyBy(action.payload, "_id");
    case PATCH_NOTE:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_NOTE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
const selectedNoteReducer = (state = 0, action) => {
  switch (action.type) {
    case SELECT_NOTE:
      return action.payload;
    case ADD_NOTE:
      return action.payload._id;
    default:
      return state;
  }
};

const editorStateReducer = (state = EditorState.createEmpty(), action) => {
  switch (action.type) {
    case EDITOR_UPDATED:
      return action.payload;

    default:
      return state;
  }
};

const notesFilterReducer = (state = "", action) => {
  switch (action.type) {
    case SET_NOTES_FILTER:
      return action.payload;
    default:
      return state;
  }
};
export default combineReducers({
  selectedNote: selectedNoteReducer,
  editorState: editorStateReducer,
  notes: notesReducer,
  notesFilter: notesFilterReducer,
});
