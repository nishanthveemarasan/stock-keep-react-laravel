import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modals from "components/Modal/Modal";
import { productStoreAction } from "store";
import FormInput from "components/UI/FormInput";
import API from "axios/axios";
import useInut from "hooks/user-input";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
const ItemModal = (props) => {
  const {
    enteredInput: productCount,
    setEnteredInput: setProductCount,
    onInputChangeHandler: onProductCountChanger,
  } = useInut("0");
  const {
    enteredInput: productCode,
    setEnteredInput: setProductCode,
    onInputChangeHandler: onProductCodeChanger,
  } = useInut("");
  const {
    enteredInput: productName,
    setEnteredInput: setProductName,
    onInputChangeHandler: onProductNameChanger,
  } = useInut("");
  const [AlertCode, setAlertCode] = useState(0);
  const [AlertText, setAlertText] = useState("");
  const [hideForm, setHideForm] = useState(true);
  const mapStateToProps = (state) => {
    return {
      isShowModel: state.productStore.isChairModalOpen,
      chairId: state.productStore.chairId,
      action: state.productStore.chairActionType,
      isLoading: state.productStore.isLoading,
      showAlert: state.productStore.showAlert,
    };
  };
  const dispatch = useDispatch();

  const state = useSelector(mapStateToProps);
  useEffect(() => {
    API.get(`get-product-details/${state.chairId}`)
      .then((response) => {
        if (response.data.data[0]) {
          setProductCode(response.data.data[0].itemcode);
          setProductName(response.data.data[0].itemname);
          setProductCount(response.data.data[0].count);
        }
      })
      .catch();
  }, [state.chairId]);

  const onSubmitHandler = (event) => {
    dispatch(productStoreAction.isHideAlert());
    event.preventDefault();
    const data = {
      itemId: state.chairId,
      itemCount: +productCount,
      action: state.action,
    };
    API.post("edit-product-details", data).then((response) => {
      dispatch(productStoreAction.isCloseLoading());
      if (response.data.http_status == "200") {
        if (state.action === "delete") {
          setHideForm(false);
        }
        dispatch(productStoreAction.isShowAlert());
        dispatch(productStoreAction.isDataChange());
        setAlertCode(200);
        setAlertText(response.data.data.msg);
      }
      console.log(response.data);
    });
  };
  const onHideHandler = () => {
    setAlertCode(0);
    setAlertText(null);
    setHideForm(true);
    dispatch(productStoreAction.closeChairModal());
  };
  const onLoadingButtonHandler = () => {
    dispatch(productStoreAction.isLoading());
  };

  return (
    <React.Fragment>
      <Modals
        onShow={state.isShowModel}
        onHideHandler={onHideHandler}
        heading={
          state.action === "update"
            ? "Update a Product"
            : "Delete a Product from Store"
        }
        actionName={
          state.action === "update"
            ? state.isLoading
              ? "Loading"
              : "Update"
            : "Delete"
        }
        onActionHandler={onSubmitHandler}
        onCLick={onLoadingButtonHandler}
      >
        {/* alert-success */}
        {state.showAlert && (
          <SnackbarContent message={AlertText} color="success" />
        )}
        {hideForm && (
          <Fragment>
            <FormInput
              id="itemCodeInput"
              type="text"
              labelName="Product Code"
              readOnly="true"
              change={onProductCodeChanger}
              value={productCode}
            />
            <FormInput
              id="itemNameInput"
              type="text"
              labelName="Product Name"
              readOnly="true"
              change={onProductNameChanger}
              value={productName}
            />
            <FormInput
              id="itemAmountInput"
              type="number"
              labelName="Product Count"
              change={onProductCountChanger}
              value={productCount}
              readOnly={state.action !== "update" && "true"}
            />
          </Fragment>
        )}
      </Modals>
    </React.Fragment>
  );
};

export default ItemModal;
