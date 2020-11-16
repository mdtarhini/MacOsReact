import {
  GOT_TRANSLATION,
  SET_SOURCE,
  NOT_FOUND,
  INPUT_UPDATING,
} from "./types";
import MeetDev from "../api/MeetDev";

export const setSource = (source) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_SOURCE, payload: source });
    if (getState().dict.input) {
      dispatch(getTranslation(getState().dict.input, source));
    }
  };
};

export const getTranslation = (input, source) => {
  return (dispatch) => {
    MeetDev.get(`/${source.code}/${input}`)
      .then((res) => dispatch({ type: GOT_TRANSLATION, payload: res.data }))
      .catch((err) => {
        dispatch({ type: NOT_FOUND });
      });
  };
};
export const setInput = (input) => {
  return { type: INPUT_UPDATING, payload: input };
};
