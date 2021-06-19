import React, { useEffect, useState } from "react";
import Modals from "components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "components/UI/FormInput";
import useInut from "hooks/user-input";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { orderStoreAction } from "store";
import FormSelect from "components/UI/FormSelect";
import { makeStyles } from "@material-ui/core/styles";
import Button from "react-bootstrap/Button";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import API from "axios/axios";
import OrderList from "components/UI/OrderList";
import Form from "react-bootstrap/Form";
const useStyles = makeStyles(styles);
const OrderModel = (props) => {
  const {
    enteredInput: orderId,
    setEnteredInput: setOrderId,
    onInputChangeHandler: onOrderIdChange,
    reset: resetOrderId,
  } = useInut("");
  const {
    enteredInput: status,
    setEnteredInput: setStatus,
    onInputChangeHandler: onStatusChange,
    reset: resetStatus,
  } = useInut("received");
  const {
    enteredInput: productName,
    setEnteredInput: setProductName,
    onInputChangeHandler: onProductNameChange,
    reset: resetName,
  } = useInut("");
  const {
    enteredInput: quantity,
    setEnteredInput: setQuantity,
    onInputChangeHandler: onQuantityChange,
    reset: resetNumber,
  } = useInut(1);
  const [pName, setPName] = useState([]);
  useEffect(() => {
    API.get("get-product-names")
      .then((response) => {
        if (response.data?.http_status) {
          setPName(response.data.data);
        }
      })
      .catch();
  }, []);
  useEffect(() => {
    API.get("order/get-latest-order-id")
      .then((response) => {
        if (response.data?.http_status) {
          setOrderId(response.data.data.order_id);
        }
      })
      .catch();
  }, []);
  const mapStateToProps = (state) => {
    return {
      isOrderCreateOpen: state.orderStore.isOrderCreateOpen,
      orderList: state.orderStore.orderList,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const onHideHandler = () => {
    dispatch(orderStoreAction.closeOrderModel());
  };
  const addItemListHandler = (event) => {
    event.preventDefault();
    const data = {
      name: productName,
      status: status,
      quantity: quantity,
    };

    dispatch(
      orderStoreAction.addList({
        data,
      })
    );
    resetName("");
    resetStatus("received");
    resetNumber(1);
  };
  const classes = useStyles();

  const statusChangeHandler = (event, id) => {
    const value = event.target.value;
    const type = "status";
    dispatch(
      orderStoreAction.changeList({
        id,
        type,
        value,
      })
    );
  };
  const quantityChangeHandler = (event, id) => {
    const value = event.target.value;
    const type = "quantity";
    dispatch(
      orderStoreAction.changeList({
        id,
        type,
        value,
      })
    );
  };

  const onRemoveListHandler = (id) => {
    dispatch(
      orderStoreAction.removeList({
        id,
      })
    );
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      orderId: orderId,
      list: state.orderList,
    };
    console.log(data);
  };

  return (
    <React.Fragment>
      <Modals
        onShow={state.isOrderCreateOpen}
        onHideHandler={onHideHandler}
        onActionHandler={onSubmitHandler}
        heading="Make an Order"
        actionName="Add Order"
        size="lg"
      >
        <FormInput
          id="orderNumber"
          type="text"
          labelName="Order Number"
          readOnly="true"
          change={onOrderIdChange}
          value={orderId}
        />
        <div className="mt-4"></div>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Order Details</h4>
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    onChange={onProductNameChange}
                    list="data"
                  />
                </div>
                {/* <input type="text" list="data" onChange={onProductNameChange} /> */}
                <datalist id="data">
                  {pName &&
                    pName.map((item, key) => {
                      return (
                        <option key={key} value={item}>
                          {item}
                        </option>
                      );
                    })}
                </datalist>
              </div>
              <div clas="col-md-3">
                <FormSelect
                  id="sellType"
                  label="Order Satus"
                  value={status}
                  change={onStatusChange}
                  options={["Received", "Processing", "Packed", "Sent"]}
                  readOnly=""
                />
              </div>
              <div className="col-md-2">
                <FormInput
                  id="itemAmountInput"
                  type="number"
                  labelName="Quantity"
                  readOnly=""
                  change={onQuantityChange}
                  value={quantity}
                />
              </div>
              <div className="col-md-3">
                <label className="d-block" style={{ visibility: "hidden" }}>
                  Button
                </label>
                <Button variant="danger" onClick={addItemListHandler}>
                  ADD
                </Button>
              </div>
            </div>

            <OrderList
              listData={state.orderList}
              statusChangeHandler={statusChangeHandler}
              quantityChangeHandler={quantityChangeHandler}
              onRemoveListHandler={onRemoveListHandler}
            />
          </CardBody>
        </Card>
      </Modals>
    </React.Fragment>
  );
};
export default OrderModel;
