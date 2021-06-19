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
const Register = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <GridContainer>
        <GridItem xs={12} sm={4} md={4}></GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Registration</h4>
              <p className={classes.cardCategoryWhite}>Signup to our System</p>
            </CardHeader>
            <CardBody>
              <Form>
                <FormInput
                  id="name"
                  type="text"
                  labelName="Name"
                  readOnly=""
                  // change={onOrderIdChange}
                  // value={orderId}
                />
                <FormInput
                  id="username"
                  type="text"
                  labelName="Username"
                  readOnly=""
                  // change={onOrderIdChange}
                  // value={orderId}
                />
                <FormInput
                  id="email"
                  type="email"
                  labelName="E-Mail"
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
                <FormInput
                  id="confirmPassword"
                  type="password"
                  labelName="confirm Password"
                  readOnly=""
                  // change={onOrderIdChange}
                  // value={orderId}
                />
              </Form>
              <div className="text-center">
                <Button color="success">SignUp</Button>
              </div>
              <div className="text-center mt-2 text-muted">
                <h6>
                  Have registered Already? <NavLink to="/login">Signin</NavLink>
                </h6>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem sm={12} md={4}></GridItem>
      </GridContainer>
    </React.Fragment>
  );
};
export default Register;
