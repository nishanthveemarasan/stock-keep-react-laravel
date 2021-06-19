import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modals from "components/Modal/Modal";
import { orderStoreAction } from "store";
import FormInput from "components/UI/FormInput";
import FormTextarea from "components/UI/FormTextarea";
import FormSelect from "components/UI/FormSelect";
import useInut from "hooks/user-input";
import API from "axios/axios";
import Alert from "components/UI/Alert";
const ProductModal = () => {
  const {
    enteredInput: orderId,
    setEnteredInput: setOrderId,
    onInputChangeHandler: onOrderIdChange,
  } = useInut("");
  const {
    enteredInput: productName,
    setEnteredInput: setProductName,
    onInputChangeHandler: onpProductNameChange,
  } = useInut("");
  const {
    enteredInput: quantity,
    setEnteredInput: setQuantity,
    onInputChangeHandler: onQuantityChange,
  } = useInut(0);
  const {
    enteredInput: status,
    setEnteredInput: setStatus,
    onInputChangeHandler: onStatusChange,
  } = useInut("");
  const {
    enteredInput: note,
    setEnteredInput: setNote,
    onInputChangeHandler: onNoteChange,
  } = useInut("");

  const [alertCode, setAlertCode] = useState(0);
  const [alertText, setAlertText] = useState("");
  const [hideForm, setHideForm] = useState(true);
  const mapStateToProps = (state) => {
    return {
      isModalOpen: state.orderStore.isModalOpen,
      action: state.orderStore.action,
      orderId: state.orderStore.orderId,
      isLoading: state.orderStore.isLoading,
      showAlert: state.orderStore.showAlert,
    };
  };
  const state = useSelector(mapStateToProps);
  useEffect(() => {
    API.get(`order/single-order-data/${state.orderId}`)
      .then((response) => {
        if (response.data.data[0]) {
          setOrderId(response.data.data[0].order_number);
          setProductName(response.data.data[0].itemname);
          setQuantity(response.data.data[0].sellcount);
          setStatus(response.data.data[0].sell_type);
          setNote(response.data.data[0].note);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [state.orderId]);
  const dispatch = useDispatch();
  const onHideHandler = () => {
    dispatch(orderStoreAction.closeModal());
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(orderStoreAction.loadingAction());
    const data = {
      sell_type: status,
      sellcount: quantity,
      note: note,
      action: state.action,
      id: state.orderId,
      itemname: productName,
    };
    console.log(data);
    API.post("order/edit-order-data", data)
      .then((response) => {
        dispatch(orderStoreAction.closeLoadingAction());
        dispatch(orderStoreAction.isAhowAlert());
        if (response.data.http_status == "200") {
          if (state.action === "delete") {
            setHideForm(false);
          }
          dispatch(orderStoreAction.dataIsChanged());
          setAlertCode(200);
          setAlertText(response.data.data.msg);
        }
      })
      .catch();
  };
  return (
    <React.Fragment>
      <Modals
        onShow={state.isModalOpen}
        onHideHandler={onHideHandler}
        onActionHandler={onSubmitHandler}
        heading={
          state.action == "update" ? "Update an Order" : "Cancel an Order"
        }
        actionName={
          state.action == "update"
            ? state.isLoading
              ? "Loading"
              : "Update"
            : state.isLoading
            ? "Loading"
            : "Cancel"
        }
      >
        {state.showAlert && (
          <Alert className="alert-success">{alertText}</Alert>
        )}
        {hideForm && (
          <Fragment>
            <FormInput
              id="orderNumber"
              type="text"
              labelName="Order Number"
              readOnly="true"
              change={onOrderIdChange}
              value={orderId}
            />
            <FormInput
              id="productName"
              type="text"
              labelName="Product Name"
              readOnly="true"
              change={onpProductNameChange}
              value={productName}
            />
            <FormInput
              id="itemAmountInput"
              type="number"
              labelName="Quantity"
              readOnly={state.action !== "update" && "true"}
              change={onQuantityChange}
              value={quantity}
            />
            <FormSelect
              id="sellType"
              label="Order Satus"
              value={status}
              change={onStatusChange}
              options={["Received", "Processing", "Packed", "Sent"]}
              readOnly={state.action !== "update" && "true"}
            />
            <FormTextarea
              id="orderNote"
              type="textarea"
              labelName="Note"
              readOnly={state.action !== "update" && "true"}
              rows="3"
              change={onNoteChange}
              value={note}
              readOnly={state.action !== "update" && "true"}
            ></FormTextarea>
          </Fragment>
        )}
      </Modals>
    </React.Fragment>
  );
};
export default ProductModal;
