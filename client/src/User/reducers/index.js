import { combineReducers } from "redux";
import {
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  USER_LOADED,
  USER_NOT_LOADED,
  SIGN_OUT,
  GUEST_NOT_LOADED,
  GUEST_LOADED,
  USER_DOING_SOMETHING,
  CONTACT_ADDED,
  CONTACT_NOT_ADDED,
  CONTACT_DELETED,
  CONTACT_NOT_DELETED,
  USER_EDITED,
  USER_NOT_EDITED,
} from "../actions/TYPES";

const initialState = {
  ongoing: false,
  verified: false,
  user: null,
  token: localStorage.getItem("token"),
  errMsg: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DOING_SOMETHING:
      return { ...state, ongoing: true, errMsg: null };
    case SIGN_UP_FAILED:
    case SIGN_IN_FAILED:
    case USER_NOT_LOADED:
    case GUEST_NOT_LOADED:
    case SIGN_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        ongoing: false,
        verified: false,
        user: null,
        token: null,
        errMsg: action.payload,
      };
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
    case GUEST_LOADED:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ongoing: false,
        verified: true,
        user: action.payload.user,
        token: action.payload.token,
        errMsg: null,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        ongoing: false,
        verified: true,
        errMsg: null,
      };
    case CONTACT_ADDED:
    case CONTACT_DELETED:
    case USER_EDITED:
      return { ...state, user: action.payload, ongoing: false, errMsg: null };
    case CONTACT_NOT_ADDED:
    case CONTACT_NOT_DELETED:
    case USER_NOT_EDITED:
      return { ...state, ongoing: false, errMsg: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
});
