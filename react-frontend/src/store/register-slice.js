import { createSlice } from "@reduxjs/toolkit";
import API from "axios/axios";
import { registerStoreAction } from "store";

const initialState = {
  passwordMatch: {
    isMatched: true,
    error: "Passwords should match",
  },
  validUser: {
    valid: true,
    error: "",
  },
  isRegisterd: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    passwordMatch(state) {
      state.passwordMatch.isMatched = true;
    },
    passwordNotMatch(state) {
      state.passwordMatch.isMatched = false;
    },
    validUser(state, action) {
      const type = action.payload.data;
      if (type === "success") {
        state.validUser.valid = true;
        state.validUser.error = "username is avalable";
      }

      if (type === "failed") {
        state.validUser.valid = false;
        state.validUser.error = "this username has already been taken!!";
      }
    },
    registeredUser(state, action) {
      const getAction = action.payload.data;
      if (getAction === "success") {
        state.isRegisterd = true;
      }
    },
    notRegistered(state) {
      state.isRegisterd = false;
    },
  },
});

export const checkUsername = (data) => {
  return (dispatch) => {
    API.post("users/check-username", data)
      .then((response) => {
        if (response.data.http_status === 200) {
          console.log(response.data.data.msg);
          dispatch(
            registerStoreAction.validUser({ data: response.data.data.msg })
          );
        }
      })
      .catch();
  };
};
export const registerUser = (data) => {
  return (dispatch) => {
    API.post("users/create", data)
      .then((response) => {
        if (response.data.http_status === 200) {
          console.log(response.data.data.msg);
          dispatch(
            registerStoreAction.registeredUser({ data: response.data.data.msg })
          );
        }
      })
      .catch();
  };
};

export default registerSlice;
