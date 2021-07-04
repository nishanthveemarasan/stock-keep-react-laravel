import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Redirect } from "react-router-dom";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import API from "axios/axios";
import { userStoreAction } from "store";
import UserTable from "components/Table/UserTable";
import UserModel from "components/Modal/Content/UserModel";
const useStyles = makeStyles(styles);
const Users = () => {
  const [auth, setAuth] = useState(false);
  const mapStateToProps = (state) => {
    return {
      userData: state.userStore.userData,
      isDataChange: state.userStore.isDataChange,
    };
  };

  const state = useSelector(mapStateToProps);
  useEffect(() => {
    if (state.isDataChange) {
      API.get("users/get-users")
        .then((response) => {
          dispatch(userStoreAction.dataDidNotChange());
          dispatch(userStoreAction.getUsers({ value: response.data }));
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message); //Unauthenticated.
          console.log(error.response.status);
          if (
            error.response.status === 401 &&
            error.response.data.message === "Unauthenticated."
          ) {
            console.log("hi");
            setAuth(true);
          }
        });
    }
  }, [state.isDataChange]);
  const pageChangeHandler = (url) => {
    if (url !== null) {
      const param = url.split("?");
      API.get(`users/get-users?${param[1]}`)
        .then((response) => {
          dispatch(userStoreAction.getUsers({ value: response.data }));
        })
        .catch();
    }
  };

  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <GridContainer>
      <React.Fragment>
        <UserModel />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>All Users</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <UserTable
                tableData={state.userData}
                pageChangeHandler={pageChangeHandler}
              />
            </CardBody>
          </Card>
        </GridItem>
      </React.Fragment>
    </GridContainer>
  );
};

export default Users;
