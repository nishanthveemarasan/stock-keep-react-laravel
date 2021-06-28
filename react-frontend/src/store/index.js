import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./comment-slice";
import dashboardSlice from "./dash-board-slice";
import likeSlice from "./like-slice";
import orderSlice from "./order-slice";
import postSlice from "./post-slice";
import productSlice from "./product-slice";
import registerSlice from "./register-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    dashboardStore: dashboardSlice.reducer,
    productStore: productSlice.reducer,
    orderStore: orderSlice.reducer,
    userStore: userSlice.reducer,
    commentStore: commentSlice.reducer,
    postStore: postSlice.reducer,
    likeStore: likeSlice.reducer,
    registerStore: registerSlice.reducer,
  },
});

export const dashboardActions = dashboardSlice.actions;
export const productStoreAction = productSlice.actions;
export const orderStoreAction = orderSlice.actions;
export const userStoreAction = userSlice.actions;
export const commentStoreAction = commentSlice.actions;
export const postStoreAction = postSlice.actions;
export const likeStoreAction = likeSlice.actions;
export const registerStoreAction = registerSlice.actions;

export default store;
