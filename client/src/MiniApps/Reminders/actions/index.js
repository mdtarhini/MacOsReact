import axios from "axios";
import {
  FETCH_LISTS,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  SELECT_LIST,
  SHOW_MODAL,
  CLOSE_MODAL,
  MODAL_UPDATING,
  ADD_REMINDER,
  FETCH_REMINDERS,
  DELETE_REMINDER,
  UPDATE_REMINDER,
  TOGGLE_COMPLETED_VISIBILITY,
  SET_FILTER,
} from "./Types";
import { tokenConfig } from "../../../User/actions";
import { SET_REQUESTING_SOMETHING } from "../../../actions/types";

export const addList = (listDetails) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_REQUESTING_SOMETHING,
      payload: { addingReminderList: true },
    });
    return axios
      .post("/api/reminders/lists", listDetails, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: ADD_LIST, payload: res.data });
        dispatch({
          type: SET_REQUESTING_SOMETHING,
          payload: { addingReminderList: false },
        });
      });
  };
};
export const editList = (listDetails, id) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_REQUESTING_SOMETHING,
      payload: { addingReminderList: true },
    });
    return axios
      .patch(`/api/reminders/lists/${id}`, listDetails, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: EDIT_LIST, payload: res.data });
        dispatch({
          type: SET_REQUESTING_SOMETHING,
          payload: { addingReminderList: false },
        });
      });
  };
};
export const fetchLists = () => {
  return (dispatch, getState) => {
    return axios
      .get("/api/reminders/lists", tokenConfig(getState))
      .then((res) => {
        dispatch({ type: FETCH_LISTS, payload: res.data });
      });
  };
};
export const selectList = (listId) => {
  return { type: SELECT_LIST, payload: listId };
};
export const deleteList = (listId, deleteChildren) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_REQUESTING_SOMETHING,
      payload: { deletingReminderList: true },
    });
    return axios
      .delete(`/api/reminders/lists/${listId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: DELETE_LIST, payload: listId });
        dispatch({
          type: SET_REQUESTING_SOMETHING,
          payload: { deletingReminderList: false },
        });
      });
  };
};
export const showModal = (params) => {
  return { type: SHOW_MODAL, payload: params };
};
export const closeModal = () => {
  return { type: CLOSE_MODAL };
};
export const modalUpdating = (values) => {
  return { type: MODAL_UPDATING, payload: values };
};
export const addReminder = (values) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_REQUESTING_SOMETHING,
      payload: { addingReminder: true },
    });
    return axios
      .post("/api/reminders/reminders", values, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: ADD_REMINDER, payload: res.data });
        dispatch({
          type: SET_REQUESTING_SOMETHING,
          payload: { addingReminder: false },
        });
      });
  };
};
export const fetchReminders = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_REQUESTING_SOMETHING,
      payload: { fetchingReminders: true },
    });
    return axios
      .get("/api/reminders/reminders", tokenConfig(getState))
      .then((res) => {
        dispatch({ type: FETCH_REMINDERS, payload: res.data });
        dispatch({
          type: SET_REQUESTING_SOMETHING,
          payload: { fetchingReminders: false },
        });
      });
  };
};

export const deleteReminder = (reminderId) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_REQUESTING_SOMETHING,
      payload: { deletingReminder: true },
    });
    return axios
      .delete(`/api/reminders/reminders/${reminderId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: DELETE_REMINDER, payload: reminderId });
        dispatch({
          type: SET_REQUESTING_SOMETHING,
          payload: { deletingReminder: false },
        });
      });
  };
};
export const editReminder = (values, reminderId) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_REQUESTING_SOMETHING,
      payload: { editingReminder: true },
    });
    return axios
      .patch(
        `/api/reminders/reminders/${reminderId}`,
        values,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({ type: UPDATE_REMINDER, payload: res.data });
        dispatch({
          type: SET_REQUESTING_SOMETHING,
          payload: { editingReminder: false },
        });
      });
  };
};

export const toggleCompletedVisibility = () => {
  return { type: TOGGLE_COMPLETED_VISIBILITY };
};
export const setFilter = (filter) => {
  return { type: SET_FILTER, payload: filter };
};
