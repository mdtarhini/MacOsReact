import { combineReducers } from "redux";
import {
  SET_SOURCE,
  GOT_TRANSLATION,
  NOT_FOUND,
  INPUT_UPDATING,
} from "../actions/types";
const sourceReducer = (state = { label: "English", code: "en" }, action) => {
  switch (action.type) {
    case SET_SOURCE:
      return action.payload;
    default:
      return state;
  }
};

const resultReducer = (state = { found: true, result: [] }, action) => {
  switch (action.type) {
    case GOT_TRANSLATION:
      return { result: action.payload, found: true };
    case NOT_FOUND:
      return { result: [], found: false };
    default:
      return state;
  }
};

const inputReducer = (state = "", action) => {
  switch (action.type) {
    case INPUT_UPDATING:
      return action.payload;
    default:
      return state;
  }
};
export default combineReducers({
  source: sourceReducer,
  result: resultReducer,
  input: inputReducer,
});
