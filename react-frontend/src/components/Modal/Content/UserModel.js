import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modals from "components/Modal/Modal";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import { userStoreAction } from "store";
import { useButton } from "hooks/get-date";
import AddAlert from "@material-ui/icons/AddAlert";
import API from "axios/axios";
import useInut from "hooks/user-input";
import FormSelect from "components/UI/FormSelect";
import { editUserRoles } from "store/user-slice";
const UserModel = () => {
  const [enableText, setEnableText] = useState(
    "Are you Sure? You really want to ENABLE this user from the system"
  );
  const [disableText, setDisableText] = useState(
    "Are you Sure? You really want to DISABLE this user from the system"
  );
  const [hideButton, setHideButton] = useState(false);
  const {
    enteredInput: userRole,
    setEnteredInput: setUSerRole,
    onInputChangeHandler: onUserRoleChange,
  } = useInut("");
  const mapStateToProps = (state) => {
    return {
      isOpenModel: state.userStore.isOpenModel,
      actionType: state.userStore.actionType,
      actionData: state.userStore.actionData,
      isLoading: state.userStore.isLoading,
    };
  };

  const state = useSelector(mapStateToProps);
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(userStoreAction.loadSubmit());
    if (state.actionType === "assignRoles") {
      const data = {
        id: state.actionData.id,
        role: userRole,
      };
      dispatch(editUserRoles(data));
    } else {
      const data = {
        id: state.actionData.id,
        currentStatus: state.actionData.status,
      };
      API.post("users/disable-a-user", data)
        .then((response) => {
          dispatch(userStoreAction.stopLoadSubmit());
          if (response.data.http_status == "200") {
            if (state.actionData.status == "1") {
              setDisableText(response.data.data.msg);
            }
            if (state.actionData.status == "0") {
              console.log(response.data.data.msg);
              setEnableText(response.data.data.msg);
            }
          }
          dispatch(userStoreAction.dataDidChange());
        })
        .catch((error) => {
          dispatch(userStoreAction.stopLoadSubmit());
          console.log(error.message);
        });
    }
  };
  const dispatch = useDispatch();
  const onHideHandler = () => {
    dispatch(userStoreAction.closeModel());
  };
  return (
    <React.Fragment>
      <Modals
        onShow={state.isOpenModel}
        onHideHandler={onHideHandler}
        onActionHandler={onSubmitHandler}
        heading={
          state.actionType == "assignRoles"
            ? "Assign/Change the User Roles"
            : "Disable a User"
        }
        actionName={useButton(
          state.actionType,
          "assignRoles",
          state.isLoading,
          "Assign",
          "Enable",
          "Disable",
          state.actionData.status
        )}
      >
        {state.actionType === "assignRoles" && (
          <FormSelect
            id="roleTypes"
            label="User Roles"
            value={userRole == "" ? state.actionData.roles : userRole}
            change={onUserRoleChange}
            options={["Admin", "User"]}
            readOnly=""
          />
        )}

        {state.actionType !== "assignRoles" &&
          state.actionData.status == "1" && (
            <SnackbarContent message={disableText} color="danger" />
          )}
        {state.actionType !== "assignRoles" &&
          state.actionData.status == "0" && (
            <SnackbarContent message={enableText} color="success" />
          )}
      </Modals>
    </React.Fragment>
  );
};
export default UserModel;

// state.actionType == "assignRoles"
// ? state.isLoading
//   ? "Loading"
//   : "Assign"
// : state.isLoading
// ? "Loading"
// : "Cancel"
