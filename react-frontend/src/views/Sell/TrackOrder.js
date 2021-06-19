import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Form from "react-bootstrap/Form";
import FormInput from "components/UI/FormInput";
import Button from "react-bootstrap/Button";
import useInut from "hooks/user-input";
import API from "axios/axios";
import OrderHistory from "components/Table/OrderHistory";
import TablePagination from "components/Table/Pagination/Pagination";
const useStyles = makeStyles(styles);

const TrackOrder = () => {
  const {
    enteredInput: productName,
    setEnteredInput: setProductName,
    onInputChangeHandler: onProductNameChange,
  } = useInut("");
  const {
    enteredInput: trackType,
    setEnteredInput: setTrackType,
    onInputChangeHandler: onTrackTypeChange,
  } = useInut("allHistory");
  const {
    enteredInput: fromDate,
    setEnteredInput: setFromDate,
    onInputChangeHandler: onFromDateChange,
  } = useInut("");
  const {
    enteredInput: toDate,
    setEnteredInput: setToDate,
    onInputChangeHandler: onToDateChange,
  } = useInut("");
  const [tableData, setTableData] = useState([]);
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
  const classes = useStyles();

  const OnSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      action: trackType,
      itemname: productName,
      fromDate: fromDate,
      toDate: toDate,
    };
    API.post("order/track-a-product-order-history", data)
      .then((response) => {
        if (response.data.http_status == "200") {
          setTableData(response.data);
        }
      })
      .catch();
  };
  const pageChangeHandler = (url) => {
    if (url !== null) {
      const param = url.split("?");
      API.get(`order/track-a-product-order-history?${param[1]}`)
        .then((response) => {
          if (response.data.http_status == "200") {
            setTableData(response.data.data);
          }
        })
        .catch();
    }
  };
  return (
    <React.Fragment>
      <GridContainer>
        <GridItem sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Track An Order / Order's History {trackType}
              </h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Form onSubmit={OnSubmitHandler}>
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
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="allHistory"
                    onChange={onTrackTypeChange}
                    checked={trackType === "allHistory"}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Whole History
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="customHistory"
                    onChange={onTrackTypeChange}
                    checked={trackType === "customHistory"}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Custom History
                  </label>
                </div>
                {trackType === "customHistory" && (
                  <GridContainer>
                    <GridItem sm={12} md={6}>
                      <FormInput
                        id="startDate"
                        type="date"
                        labelName="From"
                        readOnly=""
                        change={onFromDateChange}
                        value={fromDate}
                      />
                    </GridItem>
                    <GridItem sm={12} md={6}>
                      <FormInput
                        id="endDate"
                        type="date"
                        labelName="To"
                        readOnly=""
                        change={onToDateChange}
                        value={toDate}
                      />
                    </GridItem>
                  </GridContainer>
                )}

                <GridContainer>
                  <GridItem sm={12} md={12}>
                    <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit">
                        Track
                      </Button>
                    </div>
                  </GridItem>
                </GridContainer>
              </Form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                View Table Data {trackType}
              </h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <OrderHistory tableData={tableData} />
              <TablePagination
                paginationData={tableData}
                pageChangeHandler={pageChangeHandler}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};
export default TrackOrder;
