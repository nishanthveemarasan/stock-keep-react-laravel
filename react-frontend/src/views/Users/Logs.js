import React, { useEffect, useState } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import API from "axios/axios";
import UserLogs from "components/Table/UserLogs";
const useStyles = makeStyles(styles);

const Logs = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    API.get("users/get-logs")
      .then((response) => {
        if (response.data?.http_status) {
          setTableData(response.data);
        }
      })
      .catch();
  }, []);

  const pageChangeHandler = (url) => {
    if (url !== null) {
      const param = url.split("?");
      API.get(`users/get-logs?${param[1]}`)
        .then((response) => {
          if (response.data?.http_status) {
            setTableData(response.data);
          }
        })
        .catch();
    }
  };
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Users' Log History</h4>
            <p className={classes.cardCategoryWhite}>
              New employees on 15th September, 2016
            </p>
          </CardHeader>
          <CardBody>
            <UserLogs
              tableData={tableData}
              pageChangeHandler={pageChangeHandler}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default Logs;
