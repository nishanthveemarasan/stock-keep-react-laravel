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
  const {
    enteredInput: trackType,
    setEnteredInput: setTrackType,
    onInputChangeHandler: onTrackTypeChange,
  } = useInut("singleProduct");
  const [selectedFile, setSelectedFile] = useState("");
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
    if (trackType === "addWithCsv") {
      console.log(selectedFile);
      // setGetState((prevState) => {
      //   return {
      //     ...prevState,
      //     isLoading: true,
      //     alertText: "",
      //   };
      // });
      // var formData = new FormData();
      // formData.append("file", selectedFile);
      // API.post("product/add-multiple-products", formData, {
      //   onDownloadProgress: (progressEvent) => {
      //     let progress = `${Math.round(
      //       (progressEvent.loaded / progressEvent.total) * 100
      //     )}%`;
      //     setGetState((prevState) => {
      //       return {
      //         ...prevState,
      //         progressPercentage: progress,
      //       };
      //     });
      //   },
      // })
      //   .then((response) => {
      //     console.log(response.data);
      //     const msg = response.data.data.msg;
      //     const type = response.data.data.type;
      //     if (type === "success") {
      //       dispatch(productStoreAction.isDataChange());
      //       setGetState((prevState) => {
      //         return {
      //           ...prevState,
      //           alertText: msg,
      //           alertType: "success",
      //           isLoading: false,
      //           progressPercentage: "50%",
      //         };
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });
      // setTrackType("");
    } else {
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
    }
  };

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
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
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="singleProduct"
            onChange={onTrackTypeChange}
            checked={trackType === "singleProduct"}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Add a Single Product
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="addWithCsv"
            onChange={onTrackTypeChange}
            checked={trackType === "addWithCsv"}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Add Products with CSV
          </label>
        </div>
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
        {trackType === "singleProduct" && (
          <React.Fragment>
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
          </React.Fragment>
        )}
        {trackType === "addWithCsv" && (
          <React.Fragment>
            <FormInput
              id="userImage"
              type="file"
              labelName="Upload CSV File"
              readOnly=""
              change={fileSelectedHandler}
            />
          </React.Fragment>
        )}
      </Modals>
    </React.Fragment>
  );
};
export default ProductModel;
