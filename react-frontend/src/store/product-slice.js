import { FastfoodOutlined } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";
import API from "axios/axios";
import { productStoreAction } from "store";

const initialState = {
  chairs: [],
  isChairChanged: true,
  isChairModalOpen: false,
  chairId: 0,
  chairActionType: "",
  isLoading: false,
  showAlert: false,
  isDataChanged: true,
  isProductCreateOpen: false,
  rowNumber: 10,
  alertText: "",
  progressPercentage: "0%",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getChairs(state, action) {
      state.chairs = action.payload.chairs;
      state.isChairChanged = false;
    },

    isChairChanged(state, action) {
      state.isChairChanged = true;
    },

    openChairModal(state, action) {
      state.isChairModalOpen = true;
      state.chairId = action.payload.value;
      state.chairActionType = action.payload.type;
    },
    closeChairModal(state) {
      state.isChairModalOpen = false;
      state.chairId = 0;
      state.chairActionType = "";
      state.showAlert = false;
    },
    isLoading(state, action) {
      state.isLoading = true;
    },
    isCloseLoading(state) {
      state.isLoading = false;
      state.progressPercentage = "0%";
    },
    isShowAlert(state) {
      state.showAlert = true;
    },
    isHideAlert(state) {
      state.showAlert = false;
    },

    isDataChange(state) {
      state.isDataChanged = true;
    },
    isDataNotChange(state) {
      state.isDataChanged = false;
    },
    createModel(state) {
      state.isProductCreateOpen = true;
    },
    closeCreateModel(state) {
      state.isProductCreateOpen = false;
      state.showAlert = false;
      state.alertText = "";
    },
    changeRowNumber(state, action) {
      state.rowNumber = action.payload.rowNumber;
    },
    productAdded(state, action) {
      state.isDataChanged = true;
      state.showAlert = true;
      state.alertText = action.payload.msg;
    },
    changeProgress(state, action) {
      state.progressPercentage = action.payload.progress;
    },
  },
});

export const getProductData = (rowNumber) => {
  return (dispatch) => {
    dispatch(productStoreAction.isLoading());
    dispatch(productStoreAction.isHideAlert());
    API.get(`get-all-chairs/${rowNumber}`)
      .then((response) => {
        dispatch(productStoreAction.isDataNotChange());
        dispatch(productStoreAction.isCloseLoading());
        dispatch(
          productStoreAction.getChairs({
            chairs: response.data,
          })
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const addProduct = (data) => {
  return (dispatch) => {
    dispatch(productStoreAction.isLoading());
    API.post(`add-product`, data, {
      onDownloadProgress: (progressEvent) => {
        let progress = `${Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        )}%`;
        dispatch(
          productStoreAction.changeProgress({
            progress,
          })
        );
      },
    })
      .then((response) => {
        dispatch(productStoreAction.isCloseLoading());
        dispatch(productStoreAction.isDataChange());
        if (response.data.http_status === 200) {
          const msg = response.data.data.msg;
          dispatch(
            productStoreAction.productAdded({
              msg,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export default productSlice;

/*
, {
      onDownloadProgress: (progressEvent) => {
        let progress = `${Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        )}%`;
        console.log(progress);
      },
    }
*/
