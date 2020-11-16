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
} from "./Types";
import axios from "axios";
import { tokenConfig } from "../../../User/actions";
import { SET_REQUESTING_SOMETHING } from "../../../actions/types";

export const fetchMessages = () => {
  return (dispatch, getState) => {
    return axios.get("/api/messages", tokenConfig(getState)).then((res) => {
      dispatch({ type: FETCH_MESSAGES, payload: res.data });
    });
  };
};
export const deleteMessage = (msgId) => {
  return (dispatch, getState) => {
    return axios
      .delete(`/api/messages/${msgId}`, tokenConfig(getState))
      .then(() => {
        dispatch({ type: DELETE_MESSAGE, payload: msgId });
      });
  };
};

export const messageReceived = (msg) => {
  return (dispatch, getState) => {
    dispatch({ type: MESSAGE_RECEIVED, payload: msg });
    const selectedConv = getState().messages.selectedConv;
    if (msg.to === selectedConv || msg.from === selectedConv) {
      markConvAsSeen(selectedConv, dispatch, getState);
    }
  };
};
export const messageSent = (msg) => {
  return { type: MESSAGE_SENT, payload: msg };
};
export const markConvAsSeen = (conv, dispatch, getState) => {
  axios
    .patch(`/api/messages/saw/${conv}`, null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: SAW_MESSAGES, payload: conv });
    });
};
export const selectConverstaion = (conv) => {
  return (dispatch, getState) => {
    const prevConv = getState().messages.selectedConv;
    if (prevConv !== conv) {
      dispatch({ type: SELECT_CONVERSATION, payload: conv });
      markConvAsSeen(conv, dispatch, getState);
    }
  };
};

export const deleteConversation = (conv) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_REQUESTING_SOMETHING,
      payload: { deletingChat: true },
    });
    axios
      .patch(`/api/messages/deleteChat/${conv}`, null, tokenConfig(getState))
      .then(() => {
        dispatch({ type: DELETE_CONVERSATION, payload: conv });
        dispatch({
          type: SET_REQUESTING_SOMETHING,
          payload: { deletingChat: false },
        });
      });
  };
};
export const setContactModal = (params) => {
  return { type: SET_CONTACT_MODAL, payload: params };
};
export const switchSidebarContent = (content) => {
  return { type: SWITCH_SIDE_CONTENT, payload: content };
};

export const setMessagesFilter = (filter) => {
  return { type: SET_MESSAGES_FILTER, payload: filter };
};
