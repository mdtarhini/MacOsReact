import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  USER_LOADED,
  USER_NOT_LOADED,
  SIGN_OUT,
  GUEST_NOT_LOADED,
  GUEST_LOADED,
  CONTACT_NOT_ADDED,
  CONTACT_ADDED,
  USER_DOING_SOMETHING,
  CONTACT_DELETED,
  CONTACT_NOT_DELETED,
  USER_EDITED,
  USER_NOT_EDITED,
} from "./TYPES";
import axios from "axios";
export const loadGuest = () => {
  return (dispatch) => {
    dispatch({ type: USER_DOING_SOMETHING });
    axios
      .post("/api/users/addguest")
      .then((res) => {
        dispatch({ type: GUEST_LOADED, payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: GUEST_NOT_LOADED,
          payload: err.response.data.msg,
        });
      });
  };
};
export const signUp = ({ name, username, password }) => {
  return (dispatch) => {
    dispatch({ type: USER_DOING_SOMETHING });
    return axios
      .post("/api/users/signup", { name, username, password })
      .then((res) => {
        dispatch({ type: SIGN_UP_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: SIGN_UP_FAILED, payload: err.response.data.msg });
      });
  };
};

export const signIn = ({ username, password }) => {
  return (dispatch) => {
    dispatch({ type: USER_DOING_SOMETHING });
    return axios
      .post("/api/users/signin", { username, password })
      .then((res) => {
        dispatch({ type: SIGN_IN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: SIGN_IN_FAILED, payload: err.response.data.msg });
      });
  };
};

export const loadUserByToken = () => {
  return (dispatch, getState) => {
    const config = tokenConfig(getState);
    if (config.headers["x-auth-token"]) {
      dispatch({ type: USER_DOING_SOMETHING });
      return axios
        .get("/api/users/user", config)
        .then((res) => {
          dispatch({ type: USER_LOADED, payload: res.data.user });
        })
        .catch((err) => {
          dispatch({ type: USER_NOT_LOADED, payload: err.response.data.msg });
        });
    }
  };
};

export const addContact = (newContact) => {
  return (dispatch, getState) => {
    dispatch({ type: USER_DOING_SOMETHING });
    return axios
      .patch(
        "/api/users/user/addContact",
        {
          _id: newContact.userId,
          name: newContact.name,
          username: newContact.username,
        },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({ type: CONTACT_ADDED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: CONTACT_NOT_ADDED, payload: err.response.data.msg });
      });
  };
};
export const editName = (newName) => {
  return (dispatch, getState) => {
    if (newName !== "") {
      dispatch({ type: USER_DOING_SOMETHING });
      return axios
        .patch(
          "/api/users/user/editName",
          {
            name: newName,
          },
          tokenConfig(getState)
        )
        .then((res) => {
          dispatch({ type: USER_EDITED, payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: USER_NOT_EDITED, payload: err.response.data.msg });
        });
    }
  };
};
export const deleteContact = (contactId) => {
  return (dispatch, getState) => {
    dispatch({ type: USER_DOING_SOMETHING });
    return axios
      .patch(
        "/api/users/user/deleteContact",
        { _id: contactId },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({ type: CONTACT_DELETED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: CONTACT_NOT_DELETED, payload: err.response.data.msg });
      });
  };
};

export const tokenConfig = (getState) => {
  // get token from local storage
  const token = getState().user.auth.token;
  // Headers:
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
export const signOut = () => {
  return { type: SIGN_OUT };
};
