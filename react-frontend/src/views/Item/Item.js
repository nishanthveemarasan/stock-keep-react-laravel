import React, { useEffect } from "react";
import ProductTable from "components/Table/ProductTable";
// core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useDispatch, useSelector } from "react-redux";
import API from "axios/axios";
import { productStoreAction } from "store";
import Pagination from "components/Table/Pagination";
import Modals from "components/Modal/Modal";
import ItemModal from "components/Modal/Content/ItemModal";
import { getProductData } from "store/product-slice";
import ProductModel from "components/Modal/create/ProductModel";
const useStyles = makeStyles(styles);
const Item = () => {
  const mapStateToProps = (state) => {
    return {
      chairs: state.productStore.chairs,
      isChairChanged: state.productStore.isChairChanged,
      isDataChanged: state.productStore.isDataChanged,
      rowNumber: state.productStore.rowNumber,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  useEffect(() => {
    if (state.isDataChanged) {
      dispatch(getProductData(state.rowNumber));
    }
  }, [state.isDataChanged, dispatch]);

  const classes = useStyles();

  const onOpenCreateProductHandler = () => {
    dispatch(productStoreAction.createModel());
  };
  return (
    <React.Fragment>
      <ItemModal />
      <ProductModel />
      <div className="text-right">
        <Button color="success" onClick={onOpenCreateProductHandler}>
          Add New Item
        </Button>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Chairs</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <ProductTable tableData={state.chairs} />
              <Pagination paginationData={state.chairs} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};

export default Item;
