import React, { useState } from "react";
import Modals from "components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "components/UI/FormInput";
import useInut from "hooks/user-input";
import { productStoreAction } from "store";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { addProduct } from "store/product-slice";
import API from "axios/axios";
const ProductModel = (props) => {
  const [getState, setGetState] = useState({
    isLoading: false,
    alertText: "",
    progressPercentage: "50%",
    alertType: "",
  });
  const {
    enteredInput: productCode,
    setEnteredInput: setProductCode,
    onInputChangeHandler: onProductCodeChange,
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
  } = useInut(1);
  const mapStateToProps = (state) => {
    return {
      isProductCreateOpen: state.productStore.isProductCreateOpen,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const onHideHandler = () => {
    setProductCode("");
    setProductName("");
    setQuantity(1);
    dispatch(productStoreAction.closeCreateModel());
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      itemname: productName,
      itemcode: productCode,
      count: quantity,
    };
    setGetState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
        alertText: "",
      };
    });
    API.post(`add-product`, data, {
      onDownloadProgress: (progressEvent) => {
        let progress = `${Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        )}%`;
        setGetState((prevState) => {
          return {
            ...prevState,
            progressPercentage: progress,
          };
        });
      },
    })
      .then((response) => {
        const msg = response.data.data.msg;
        const type = response.data.data.type;
        if (type === "success") {
          dispatch(productStoreAction.isDataChange());
          setGetState((prevState) => {
            return {
              ...prevState,
              alertText: msg,
              alertType: "success",
              isLoading: false,
              progressPercentage: "50%",
            };
          });
        } else {
          setGetState((prevState) => {
            return {
              ...prevState,
              alertText: msg,
              alertType: "danger",
              isLoading: false,
              progressPercentage: "50%",
            };
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    setProductCode("");
    setProductName("");
    setQuantity(1);
  };
  return (
    <React.Fragment>
      <Modals
        onShow={state.isProductCreateOpen}
        onHideHandler={onHideHandler}
        onActionHandler={onSubmitHandler}
        heading="Add a New Product"
        actionName={
          getState.isLoading ? getState.progressPercentage : "Add Product"
        }
      >
        {getState.isLoading && (
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${getState.progressPercentage}` }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        )}
        {getState.alertText && (
          <SnackbarContent
            message={getState.alertText}
            color={`${getState.alertType}`}
          />
        )}

        <FormInput
          id="prodcutCode"
          type="text"
          labelName="Product Code"
          readOnly=""
          change={onProductCodeChange}
          value={productCode}
        />
        <FormInput
          id="productName"
          type="text"
          labelName="Product Name"
          readOnly=""
          change={onpProductNameChange}
          value={productName}
        />
        <FormInput
          id="itemAmountInput"
          type="number"
          labelName="Quantity"
          readOnly=""
          change={onQuantityChange}
          value={quantity}
        />
      </Modals>
    </React.Fragment>
  );
};
export default ProductModel;
