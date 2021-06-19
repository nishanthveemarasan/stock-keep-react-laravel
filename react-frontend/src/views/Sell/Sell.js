import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import OrderTable from "components/Table/OrderTable";
import API from "axios/axios";
import Pagination from "components/Table/Pagination";
import { orderStoreAction } from "store";
import ProductModal from "components/Modal/Content/ProductModal";
import OrderModel from "components/Modal/create/OrderModel";
const useStyles = makeStyles(styles);

const Sell = () => {
  const mapStateToProps = (state) => {
    return {
      orderData: state.orderStore.orderData,
      isDataChange: state.orderStore.isDataChange,
    };
  };
  const state = useSelector(mapStateToProps);
  useEffect(() => {
    if (state.isDataChange) {
      API.get("order/get-order-data")
        .then((response) => {
          if (response.data.http_status) {
            dispatch(orderStoreAction.dataNotChanged());
            dispatch(
              orderStoreAction.getOrderData({
                data: response.data,
              })
            );
          }
        })
        .catch();
    }
  }, [state.isDataChange]);
  const dispatch = useDispatch();

  const onOpenCreateOrderHandler = () => {
    dispatch(orderStoreAction.createOrderModel());
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <ProductModal />
      <OrderModel />
      <div className="text-right">
        <Button color="success" onClick={onOpenCreateOrderHandler}>
          Make an Order
        </Button>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>ORDER History</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              {state.orderData && <OrderTable tableData={state.orderData} />}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};

export default Sell;
