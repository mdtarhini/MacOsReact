import { combineReducers } from "redux";
import { CONTACT_ADDED } from "../../../User/actions/TYPES";

import {
  FETCH_MESSAGES,
  DELETE_MESSAGE,
  MESSAGE_RECEIVED,
  SELECT_CONVERSATION,
  SET_CONTACT_MODAL,
  SWITCH_SIDE_CONTENT,
  SET_MESSAGES_FILTER,
  SAW_MESSAGES,
  DELETE_CONVERSATION,
  MESSAGE_SENT,
} from "../actions/Types";

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      return action.payload;
    case SAW_MESSAGES:
      return state.map((msg) => {
        return {
          ...msg,
          isSeen: msg.from === action.payload ? true : msg.isSeen,
        };
      });

    case DELETE_MESSAGE:
      return state.filter((msg) => msg._id !== action.payload);
    case DELETE_CONVERSATION:
      return state.filter(
        (msg) => !(msg.to === action.payload || msg.from === action.payload)
      );
    case MESSAGE_SENT:
      return [...state, action.payload];
    case MESSAGE_RECEIVED:
      return [
        ...state.filter((msg) => {
          if (
            msg.to === action.payload.to &&
            msg.from === action.payload.from &&
            new Date(msg.sentAt).getTime() ===
              new Date(action.payload.sentAt).getTime()
          ) {
            return false;
          }
          return true;
        }),
        action.payload,
      ];
    default:
      return state;
  }
};

const selectedConvReducer = (state = null, action) => {
  switch (action.type) {
    case SELECT_CONVERSATION:
      return action.payload;
    default:
      return state;
  }
};

const contactModalReducer = (state = { visible: false }, action) => {
  switch (action.type) {
    case CONTACT_ADDED:
      return { ...state, visible: false };
    case SET_CONTACT_MODAL:
      return action.payload;
    default:
      return state;
  }
};
const sideContentReducer = (state = "chat", action) => {
  switch (action.type) {
    case SWITCH_SIDE_CONTENT:
      return action.payload;
    default:
      return state;
  }
};
const messagesFilterReducer = (state = "", action) => {
  switch (action.type) {
    case SET_MESSAGES_FILTER:
      return action.payload;
    default:
      return state;
  }
};
export default combineReducers({
  messages: messagesReducer,
  selectedConv: selectedConvReducer,
  contactModal: contactModalReducer,
  sideContent: sideContentReducer,
  messagesFilter: messagesFilterReducer,
});
