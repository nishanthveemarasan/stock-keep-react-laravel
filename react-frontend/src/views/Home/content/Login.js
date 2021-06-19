import classes from "./Login.module.css";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import Button from "components/CustomButtons/Button";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import FormInput from "components/UI/FormInput";
import Form from "react-bootstrap/Form";
import Button from "components/CustomButtons/Button";
import { NavLink } from "react-router-dom";
import { Home } from "@material-ui/icons";
import React from "react";
import MainNavigation from "../MainNavigation";
const Login = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <div className="mt-4">
        <GridContainer>
          <GridItem sm={12} md={4}></GridItem>
          <GridItem sm={12} md={4}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>User Login</h4>
                <p className={classes.cardCategoryWhite}>
                  SignIn to your account
                </p>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormInput
                    id="username"
                    type="text"
                    labelName="Username"
                    readOnly=""
                    // change={onOrderIdChange}
                    // value={orderId}
                  />
                  <FormInput
                    id="password"
                    type="password"
                    labelName="Password"
                    readOnly=""
                    // change={onOrderIdChange}
                    // value={orderId}
                  />
                </Form>
                <div className="text-center">
                  <Button color="success">LOGIN</Button>
                </div>
                <div className="text-center mt-2 text-muted">
                  <h6>
                    Don't have an Account?{" "}
                    <NavLink to="/register">Create</NavLink>
                  </h6>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem sm={12} md={4}></GridItem>
        </GridContainer>
      </div>
    </React.Fragment>
  );
};
export default Login;
