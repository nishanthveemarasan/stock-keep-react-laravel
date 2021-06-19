import { createSlice } from "@reduxjs/toolkit";
import API from "axios/axios";
import { userStoreAction } from "store";

const initialState = {
  userData: [],
  isOpenModel: false,
  actionType: "",
  actionData: "",
  isLoading: false,
  isDataChange: true,
  singleUserData: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers(state, action) {
      state.userData = action.payload.value;
    },
    openModel(state, action) {
      state.isOpenModel = true;
      state.actionType = action.payload.type;
      state.actionData = action.payload.row;
    },
    closeModel(state, action) {
      state.isOpenModel = false;
      state.actionType = "";
      state.actionData = "";
    },
    loadSubmit(state) {
      state.isLoading = true;
    },
    stopLoadSubmit(state) {
      state.isLoading = false;
    },
    dataDidNotChange(state) {
      state.isDataChange = false;
    },
    dataDidChange(state) {
      state.isDataChange = true;
    },
    getSingleData(state, action) {
      state.singleUserData = action.payload.userData;
    },
  },
});

export const editUserRoles = (data) => {
  return (dispatch) => {
    API.post("users/edit-user-role", data)
      .then((response) => {
        dispatch(userStoreAction.stopLoadSubmit());
        dispatch(userStoreAction.dataDidChange());
      })
      .catch((error) => {
        dispatch(userStoreAction.stopLoadSubmit());
        console.log(error.message);
      });
  };
};

export const getSingleUser = () => {
  return (dispatch) => {
    API.get("users/get-a-user/1")
      .then((response) => {
        if (response.data.http_status == "200") {
          const userData = response.data.data;
          dispatch(
            userStoreAction.getSingleData({
              userData,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export default userSlice;
