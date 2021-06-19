import { createSlice } from "@reduxjs/toolkit";
import API from "axios/axios";
import { postStoreAction } from "store";

const initialState = {
  postData: [],
  isModelOpen: false,
  actionData: "",
  actionType: "",
  isLoading: false,
  deletePost: "Are you Sure? You really want to DELETE this Post",
  iscreatePostMdelOpen: false,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostData(state, action) {
      state.postData = action.payload.data;
    },
    modelOpen(state, action) {
      state.isModelOpen = true;
      state.actionData = action.payload.data;
      state.actionType = action.payload.type;
      // console.log(state.actionData, state.isModelOpen);
    },
    modelClose(state) {
      state.isModelOpen = false;
      state.actionData = "";
      state.actionType = "";
    },
    loadDataButton(state) {
      state.isLoading = true;
    },
    closeLoadDataButton(state) {
      state.isLoading = false;
    },
    deletePost(state, action) {
      state.deletePost = action.payload.msg;
    },
    createPostModel(state) {
      state.iscreatePostMdelOpen = true;
    },
    closeCreatePostModel(state) {
      state.iscreatePostMdelOpen = false;
    },
  },
});

export const getPostData = () => {
  return (dispatch) => {
    API.get("posts/get-posts")
      .then((response) => {
        if (response.data.http_status == "200") {
          dispatch(
            postStoreAction.getPostData({
              data: response.data,
            })
          );
        }
      })
      .catch();
  };
};

export const getPostPageData = (url) => {
  return (dispatch) => {
    if (url !== null) {
      const param = url.split("?");
      API.get(`posts/get-posts?${param[1]}`)
        .then((response) => {
          if (response.data.http_status == "200") {
            dispatch(
              postStoreAction.getPostData({
                data: response.data,
              })
            );
          }
        })
        .catch();
    }
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    API.get(`posts/delete/${id}`)
      .then((response) => {
        dispatch(postStoreAction.closeLoadDataButton());
        if (response.data.http_status == "200") {
          dispatch(
            postStoreAction.deletePost({
              msg: response.data.data.msg,
            })
          );
        }
      })
      .catch();
  };
};

export default postSlice;
