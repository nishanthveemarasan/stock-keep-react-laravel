import { createSlice } from "@reduxjs/toolkit";
import API from "axios/axios";
import { commentStoreAction } from "store";
const initialState = {
  commentData: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getCommentData(state, action) {
      state.commentData = action.payload.data;
    },
  },
});

export const getCommentData = () => {
  return (dispatch) => {
    API.get("comments/get-comments")
      .then((response) => {
        if (response.data.http_status == "200") {
          dispatch(
            commentStoreAction.getCommentData({
              data: response.data,
            })
          );
        }
      })
      .catch();
  };
};

export const getCommentPageData = (url) => {
  return (dispatch) => {
    if (url !== null) {
      const param = url.split("?");
      API.get(`comments/get-comments?${param[1]}`)
        .then((response) => {
          if (response.data.http_status == "200") {
            dispatch(
              commentStoreAction.getCommentData({
                data: response.data,
              })
            );
          }
        })
        .catch();
    }
  };
};

export default commentSlice;
