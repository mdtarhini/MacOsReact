import { combineReducers } from "redux";
import _ from "lodash";
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
} from "../actions/Types";

const listsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LIST:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_LIST:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_LISTS:
      return { ...state, ..._.keyBy(action.payload, "_id") };
    case DELETE_LIST:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

const remindersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REMINDERS:
      return { ...state, ..._.keyBy(action.payload, "_id") };
    case ADD_REMINDER:
    case UPDATE_REMINDER:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_REMINDER:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
const selectedListReducer = (state = "", action) => {
  switch (action.type) {
    case SELECT_LIST:
      return action.payload;
    default:
      return state;
  }
};
const listModalVisibilityReducer = (state = false, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return true;
    case CLOSE_MODAL:
      return false;
    default:
      return state;
  }
};
const listModalParamsReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_MODAL:
    case MODAL_UPDATING:
      return action.payload;
    default:
      return state;
  }
};
const completedVisibilityReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_COMPLETED_VISIBILITY:
      return !state;
    default:
      return state;
  }
};
const filterReducer = (state = { type: "custom", value: "All" }, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};
export default combineReducers({
  lists: listsReducer,
  reminders: remindersReducer,
  selectedList: selectedListReducer,
  listModalVisibility: listModalVisibilityReducer,
  listModalParams: listModalParamsReducer,
  completedVisibility: completedVisibilityReducer,
  filter: filterReducer,
});
