import { createSlice } from "@reduxjs/toolkit";
import API from "axios/axios";
import { likeStoreAction } from "store";

const initialState = {
  isUserLiked: false,
  postLiked: 0,
  didDataChanged: true,
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    addLikeData(state, action) {
      state.isUserLiked = action.payload.liked;
      state.postLiked = action.payload.likeCount;
    },

    dataChanged(state) {
      state.didDataChanged = true;
      console.log("data changed");
    },
    dataDidNotChanged(state) {
      state.didDataChanged = false;
      console.log("data not changed");
    },
  },
});

export const getLikesData = (data) => {
  return (dispatch) => {
    API.post("likes/is-post-liked", data)
      .then((response) => {
        if (response.data.http_status == "200") {
          const liked = response.data.data?.userLiked;
          const likeCount = response.data.data?.postLikes;
          dispatch(likeStoreAction.dataDidNotChanged());
          dispatch(
            likeStoreAction.addLikeData({
              liked,
              likeCount,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};
export const updateLikesData = (data) => {
  return (dispatch) => {
    API.post("likes/update-user-like", data)
      .then((response) => {
        if (
          response.data.http_status == "200" &&
          response.data.data.status === '"success"'
        ) {
          console.log("data has been updated");
          dispatch(likeStoreAction.dataChanged());
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export default likeSlice;
