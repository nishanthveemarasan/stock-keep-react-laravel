import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Login.module.css";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { useHistory } from "react-router-dom";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import FormInput from "components/UI/FormInput";
import Form from "react-bootstrap/Form";
import Button from "components/CustomButtons/Button";
import { NavLink } from "react-router-dom";
import { Home } from "@material-ui/icons";

import MainNavigation from "../MainNavigation";
import useFormValidate from "hooks/input-validation";
import { registerStoreAction } from "store";
import { checkUsername } from "store/register-slice";
import { registerUser } from "store/register-slice";
const Register = () => {
  const mapStateToProps = (state) => {
    return {
      passwordMatch: state.registerStore.passwordMatch,
      validUser: state.registerStore.validUser,
      isRegisterd: state.registerStore.isRegisterd,
    };
  };
  const state = useSelector(mapStateToProps);
  useEffect(() => {
    if (state.isRegisterd) {
      History.push("/login");
    }
  }, [state.isRegisterd]);

  const History = useHistory();
  // if (state.isRegisterd) {
  //   History.push("/login");
  // }
  const dispatch = useDispatch();
  const {
    inputValue: name,
    inputIsTouched: isNameTouched,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameResetHandler,
  } = useFormValidate();
  const {
    inputValue: username,
    inputIsTouched: isUsernameTouched,
    inputChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: usernameResetHandler,
  } = useFormValidate();
  const {
    inputValue: email,
    inputIsTouched: isEmailTouched,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailResetHandler,
  } = useFormValidate();
  const {
    inputValue: password,
    inputIsTouched: isPasswordTouched,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordResetHandler,
  } = useFormValidate();
  const {
    inputValue: passwordConfirm,
    inputIsTouched: isPasswordConfirmTouched,
    inputChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    reset: passwordConfirmResetHandler,
  } = useFormValidate();

  useEffect(() => {
    const data = {
      userName: username,
    };
    if (username.trim().length > 6) {
      dispatch(checkUsername(data));
    }
  }, [username]);

  let isFormValid = false;
  const enteredNameIsValid = name.trim() !== "";
  const enteredNameIsInvalid = !enteredNameIsValid && isNameTouched;

  const enteredUsernameIsValid = username.trim().length >= 6;
  const enteredUsernameIsInvalid = !enteredUsernameIsValid && isUsernameTouched;

  const enteredEmailIsValid = email.includes("@");
  const enteredEmailIsInvalid = !enteredEmailIsValid && isEmailTouched;

  const enteredPasswordIsValid = password.trim() !== "";
  const enteredPasswordIsInvalid = !enteredPasswordIsValid && isPasswordTouched;

  // if (enteredUsernameIsValid) {
  //   const data = {
  //     userName: username,
  //   };
  //   dispatch(checkUsername(data));
  //   console.log(state.validUser.valid);
  // }
  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredUsernameIsValid &&
    enteredPasswordIsValid
  ) {
    isFormValid = true;
  }
  const onRegisterHandler = (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      dispatch(registerStoreAction.passwordNotMatch());
    } else {
      dispatch(registerStoreAction.passwordMatch());
      console.log(state.validUser.valid);
      if (state.validUser.valid) {
        const data = {
          name,
          username,
          email,
          password,
        };

        dispatch(registerUser(data));
      } else {
        console.log("not valid");
      }
    }
  };
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
              <Form onSubmit={onRegisterHandler}>
                <FormInput
                  id="name"
                  type="text"
                  labelName="Name"
                  readOnly=""
                  change={nameChangeHandler}
                  value={name}
                  blur={nameBlurHandler}
                />
                {enteredNameIsInvalid && (
                  <p style={{ color: "red" }}>First Name cant be empty</p>
                )}
                <FormInput
                  id="username"
                  type="text"
                  labelName="Username(min 6 charactor)"
                  readOnly=""
                  change={usernameChangeHandler}
                  value={username}
                  blur={usernameBlurHandler}
                />
                {enteredUsernameIsInvalid && (
                  <p style={{ color: "red" }}>
                    username should have aleast 6 charactors
                  </p>
                )}
                {!enteredUsernameIsInvalid && state.validUser.valid && (
                  <p style={{ color: "green" }}>{state.validUser.error}</p>
                )}
                {!enteredUsernameIsInvalid && !state.validUser.valid && (
                  <p style={{ color: "red" }}>{state.validUser.error}</p>
                )}
                <FormInput
                  id="email"
                  type="email"
                  labelName="E-Mail"
                  readOnly=""
                  change={emailChangeHandler}
                  value={email}
                  blur={emailBlurHandler}
                />
                {enteredEmailIsInvalid && (
                  <p style={{ color: "red" }}>Please enter valid email</p>
                )}
                <FormInput
                  id="password"
                  type="password"
                  labelName="Password"
                  readOnly=""
                  change={passwordChangeHandler}
                  value={password}
                  blur={passwordBlurHandler}
                />
                {enteredPasswordIsInvalid && (
                  <p style={{ color: "red" }}>password cant be empty</p>
                )}
                <FormInput
                  id="confirmPassword"
                  type="password"
                  labelName="confirm Password"
                  readOnly=""
                  change={passwordConfirmChangeHandler}
                  value={passwordConfirm}
                  blur={passwordConfirmBlurHandler}
                />
                {!state.passwordMatch.isMatched && (
                  <p style={{ color: "red" }}>{state.passwordMatch.error}</p>
                )}

                <div className="text-center">
                  <Button color="success" type="submit" disabled={!isFormValid}>
                    SignUp
                  </Button>
                </div>
              </Form>

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
