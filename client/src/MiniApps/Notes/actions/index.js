import {
  SELECT_NOTE,
  EDITOR_UPDATED,
  ADD_NOTE,
  FETCH_NOTES,
  DELETE_NOTE,
  PATCH_NOTE,
  SET_NOTES_FILTER,
} from "./types";
import { SET_REQUESTING_SOMETHING } from "../../../actions/types";
import axios from "axios";
import { tokenConfig } from "../../../User/actions";
export const selectANote = (noteId) => {
  return { type: SELECT_NOTE, payload: noteId };
};

export const editorUpdated = (editorState) => {
  return {
    type: EDITOR_UPDATED,
    payload: editorState,
  };
};

export const addNote = (noteDetails) => {
  return (dispatch, getStatus) => {
    dispatch({ type: SET_REQUESTING_SOMETHING, payload: { addingNote: true } });
    return axios
      .post("/api/notes", noteDetails, tokenConfig(getStatus))
      .then((res) => {
        dispatch({ type: ADD_NOTE, payload: res.data });
        dispatch({
          type: SET_REQUESTING_SOMETHING,
          payload: { addingNote: false },
        });
      });
  };
};
export const fetchNotes = () => {
  return (dispatch, getStatus) => {
    dispatch({
      type: SET_REQUESTING_SOMETHING,
      payload: { fetchingNotes: true },
    });
    return axios.get("/api/notes", tokenConfig(getStatus)).then((res) => {
      dispatch({ type: FETCH_NOTES, payload: res.data });
      dispatch({
        type: SET_REQUESTING_SOMETHING,
        payload: { fetchingNotes: false },
      });
    });
  };
};
export const deleteNote = (noteId) => {
  return (dispatch, getStatus) => {
    dispatch({
      type: SET_REQUESTING_SOMETHING,
      payload: { deletingNote: true },
    });
    return axios
      .delete(`/api/notes/${noteId}`, tokenConfig(getStatus))
      .then(() => {
        dispatch({ type: DELETE_NOTE, payload: noteId });
        dispatch({
          type: SET_REQUESTING_SOMETHING,
          payload: { deletingNote: false },
        });
      });
  };
};
export const patchNote = (noteId, updatedContent) => {
  return (dispatch, getStatus) => {
    dispatch({
      type: SET_REQUESTING_SOMETHING,
      payload: { editingNote: true },
    });
    return axios
      .patch(`/api/notes/${noteId}`, updatedContent, tokenConfig(getStatus))
      .then((res) => {
        dispatch({ type: PATCH_NOTE, payload: res.data });
        dispatch({
          type: SET_REQUESTING_SOMETHING,
          payload: { editingNote: false },
        });
      });
  };
};
export const setNotesFilter = (filter) => {
  return { type: SET_NOTES_FILTER, payload: filter };
};
