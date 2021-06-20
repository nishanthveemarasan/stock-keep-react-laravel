import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderData: [],
  isModalOpen: false,
  action: "",
  orderId: 0,
  isLoading: false,
  showAlert: false,
  isDataChange: true,
  isOrderCreateOpen: false,
  orderList: [],
  orderCreated: true,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderData(state, action) {
      state.orderData = action.payload.data;
    },
    openModal(state, action) {
      state.isModalOpen = true;
      state.action = action.payload.type;
      state.orderId = action.payload.id;
      //console.log(state.action, state.orderId);
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.action = "";
      state.orderId = 0;
      state.isLoading = false;
      state.showAlert = false;
    },
    loadingAction(state) {
      state.isLoading = true;
    },
    closeLoadingAction(state) {
      state.isLoading = false;
    },
    isAhowAlert(state) {
      state.showAlert = true;
    },
    dataIsChanged(state) {
      state.isDataChange = true;
    },
    dataNotChanged(state) {
      state.isDataChange = false;
    },
    createOrderModel(state) {
      state.isOrderCreateOpen = true;
    },
    closeOrderModel(state) {
      state.isOrderCreateOpen = false;
    },
    changeList(state, action) {
      const id = action.payload.id;
      const key = action.payload.type;
      const value = action.payload.value;
      if (key === "status") {
        state.orderList[id].status = value;
      } else {
        state.orderList[id].quantity = value;
      }
    },
    addList(state, action) {
      state.orderList.push(action.payload.data);
    },
    removeList(state, action) {
      state.orderList.splice(action.payload.id, 1);
    },
    clearList(state) {
      state.orderList = [];
      state.orderCreated = true;
    },
    orderNotCreated(state) {
      state.orderCreated = false;
    },
  },
});

export default orderSlice;
