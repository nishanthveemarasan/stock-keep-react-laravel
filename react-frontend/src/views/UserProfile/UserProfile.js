import React, { useEffect, useState } from "react";
// @material-ui/core components
import userClass from "./userProfile.module.css";
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FormInput from "components/UI/FormInput";
import FormTextarea from "components/UI/FormTextarea";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import API from "axios/axios";
import useInut from "hooks/user-input";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const [alert, setAlert] = useState("");
  const [selectedImage, setSelectedImage] = useState({
    profileImage: "",
    src: "",
  });
  const {
    enteredInput: username,
    setEnteredInput: setUsername,
    onInputChangeHandler: onUserNameChanged,
  } = useInut("");
  const {
    enteredInput: email,
    setEnteredInput: setEmail,
    onInputChangeHandler: onEmailChanged,
  } = useInut("");
  const {
    enteredInput: firstName,
    setEnteredInput: setFirstName,
    onInputChangeHandler: onFNameChanged,
  } = useInut("");
  const {
    enteredInput: lastName,
    setEnteredInput: setLastName,
    onInputChangeHandler: onLNameChanged,
  } = useInut("");
  const {
    enteredInput: phoneNumber,
    setEnteredInput: setPhone,
    onInputChangeHandler: onPhoneChanged,
  } = useInut("");
  const {
    enteredInput: city,
    setEnteredInput: setCity,
    onInputChangeHandler: onCityChanged,
  } = useInut("");
  const {
    enteredInput: country,
    setEnteredInput: setCountry,
    onInputChangeHandler: onCountryChanged,
  } = useInut("");
  const {
    enteredInput: zip,
    setEnteredInput: setZip,
    onInputChangeHandler: onZipChanged,
  } = useInut("");
  const {
    enteredInput: jobTitle,
    setEnteredInput: setJobTitle,
    onInputChangeHandler: onJobChanged,
  } = useInut("");
  const {
    enteredInput: aboutMe,
    setEnteredInput: SetAboutMe,
    onInputChangeHandler: onAbountMeChanged,
  } = useInut("");
  const {
    enteredInput: userRole,
    setEnteredInput: setUserRole,
    onInputChangeHandler: onRoleChanged,
  } = useInut("");
  useEffect(() => {
    API.get("users/get-a-user/1")
      .then((response) => {
        if (response.data.http_status == "200") {
          const userData = response.data.data;
          setUsername(userData.username);
          setEmail(userData.email);
          setFirstName(userData.name);
          setLastName(userData.last_name);
          setPhone(userData.phone);
          setCity(userData.city);
          setCountry(userData.country);
          setZip(userData.postal_code);
          setJobTitle(userData.job_title);
          SetAboutMe(userData.about_me);
          setUserRole(userData.roles);
          setSelectedImage((prevState) => {
            return {
              ...prevState,
              src: userData.profile_photo_path,
            };
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const classes = useStyles();
  const fileSelectedHandler = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    setSelectedImage((prevState) => {
      return {
        ...prevState,
        profileImage: event.target.files[0],
        src: url,
      };
    });
    var formData = new FormData();

    formData.append("file", event.target.files[0]);
    formData.append("userId", 1);
    API.post("users/update-prifile-image", formData, {
      headers: {
        "Content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (response.data.http_status === 200) {
          console.log("success");
        }
      })
      .catch();

    // console.log(url);
  };

  const fileUploadHandler = () => {
    console.log(selectedImage.profileImage);
    var formData = new FormData();

    formData.append("file", selectedImage.profileImage);
    API.post("get-image", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch();
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setAlert("");
    const data = {
      user_id: 1,
      phone: phoneNumber,
      last_name: lastName,
      about_me: aboutMe,
      city: city,
      country: country,
      postal_code: zip,
      job_title: jobTitle,
    };
    API.post("users/update-a-user", data)
      .then((response) => {
        if (response.data.http_status === 200) {
          setAlert(response.data.data.msg);
        }
      })
      .catch();
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <Form onSubmit={onSubmitHandler}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                {alert && <SnackbarContent message={alert} color="success" />}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormInput
                      id="username"
                      type="text"
                      labelName="User Name"
                      readOnly="true"
                      value={username}
                      change={onUserNameChanged}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormInput
                      id="userEmail"
                      type="email"
                      labelName="Email Address"
                      readOnly="true"
                      value={email}
                      change={onEmailChanged}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormInput
                      id="firstName"
                      type="text"
                      labelName="First Name"
                      readOnly=""
                      value={firstName}
                      change={onFNameChanged}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormInput
                      id="lastName"
                      type="text"
                      labelName="Last Name"
                      readOnly=""
                      value={!lastName ? "" : lastName}
                      change={onLNameChanged}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormInput
                      id="phone"
                      type="text"
                      labelName="Phone Number"
                      readOnly=""
                      value={!phoneNumber ? "" : phoneNumber}
                      change={onPhoneChanged}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormInput
                      id="userCity"
                      type="text"
                      labelName="City"
                      readOnly=""
                      value={!city ? "" : city}
                      change={onCityChanged}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormInput
                      id="userCountry"
                      type="text"
                      labelName="Country"
                      readOnly=""
                      value={!country ? "" : country}
                      change={onCountryChanged}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormInput
                      id="userPostCode"
                      type="text"
                      labelName="Postal Code"
                      readOnly=""
                      value={!zip ? "" : zip}
                      change={onZipChanged}
                    />
                  </GridItem>
                </GridContainer>{" "}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormInput
                      id="jobTitle"
                      type="text"
                      labelName="Job Title"
                      readOnly=""
                      value={!jobTitle ? "" : jobTitle}
                      change={onJobChanged}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormInput
                      id="userRole"
                      type="text"
                      labelName="User Role"
                      readOnly="true"
                      value={userRole}
                      change={onRoleChanged}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={9} md={8} className="">
                    <FormInput
                      id="userImage"
                      type="file"
                      labelName="Change Profile"
                      readOnly=""
                      change={fileSelectedHandler}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={3} md={4} lg={3} xl={2} className="">
                    <img
                      src={selectedImage.src}
                      alt="..."
                      className={userClass["user-image"]}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormTextarea
                      id="aboutUSer"
                      type="textarea"
                      labelName="About Yourself"
                      readOnly=""
                      rows="3"
                      value={!aboutMe ? "" : aboutMe}
                      change={onAbountMeChanged}
                    ></FormTextarea>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <label>
                <img src={selectedImage.src} alt="..." />
              </label>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>
                {jobTitle ? jobTitle : "JOB TITLE"}
              </h6>
              <h4 className={classes.cardTitle}>{`${firstName} ${
                lastName ? lastName : ""
              }`}</h4>
              <p className={classes.description}>
                {aboutMe
                  ? aboutMe
                  : "please describe about yourself briefly, including your job description, How long have you been working here and your hobbies too"}
              </p>
              <Button color="primary">Follow</Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
