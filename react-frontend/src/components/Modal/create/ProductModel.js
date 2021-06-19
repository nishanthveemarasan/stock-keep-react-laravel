import React from "react";
import Modals from "components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "components/UI/FormInput";
import useInut from "hooks/user-input";
import { productStoreAction } from "store";
const ProductModel = (props) => {
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
  const onSubmitHandler = (event) => {};
  return (
    <React.Fragment>
      <Modals
        onShow={state.isProductCreateOpen}
        onHideHandler={onHideHandler}
        onActionHandler={onSubmitHandler}
        heading="Add a New Product"
        actionName="Add PRoduct"
      >
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
