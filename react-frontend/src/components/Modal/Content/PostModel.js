import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modals from "components/Modal/Modal";
import { postStoreAction } from "store";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { deletePost } from "store/post-slice";
import useInut from "hooks/user-input";
import FormInput from "components/UI/FormInput";
import FormTextarea from "components/UI/FormTextarea";
import FormSelect from "components/UI/FormSelect";

const PostModel = () => {
  const {
    enteredInput: authorName,
    setEnteredInput: setAuthorName,
    onInputChangeHandler: onAuthorNameChange,
  } = useInut("");
  const {
    enteredInput: postTitle,
    setEnteredInput: setPostTitle,
    onInputChangeHandler: onPostTitleChange,
  } = useInut("");
  const {
    enteredInput: postContent,
    setEnteredInput: setPostContent,
    onInputChangeHandler: onPostContentChange,
  } = useInut("");
  const {
    enteredInput: postType,
    setEnteredInput: setPostType,
    onInputChangeHandler: onPostTypeChange,
  } = useInut("");
  const mapStateToProps = (state) => {
    return {
      isModelOpen: state.postStore.isModelOpen,
      actionData: state.postStore.actionData,
      actionType: state.postStore.actionType,
      isLoading: state.postStore.isLoading,
      deletePost: state.postStore.deletePost,
    };
  };
  const state = useSelector(mapStateToProps);
  useEffect(() => {
    setAuthorName(state.actionData.name);
    setPostTitle(state.actionData.title);
    setPostContent(state.actionData.content);
    setPostType(state.actionData.status);
  }, [state.actionData]);
  const dispatch = useDispatch();
  const onHideHandler = () => {
    dispatch(postStoreAction.modelClose());
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(postStoreAction.loadDataButton());
    dispatch(deletePost(state.actionData.id));
  };
  return (
    <React.Fragment>
      <Modals
        onShow={state.isModelOpen}
        onHideHandler={onHideHandler}
        onActionHandler={onSubmitHandler}
        heading={state.actionType == "edit" ? "Update a Post" : "Delete a Post"}
        actionName={
          state.actionType == "edit"
            ? state.isLoading
              ? "Loading"
              : "Update"
            : state.isLoading
            ? "Loading"
            : "Delete"
        }
      >
        {state.actionType === "edit" && (
          <Fragment>
            <FormInput
              id="authorName"
              type="text"
              labelName="Author Name"
              readOnly="true"
              change={onAuthorNameChange}
              value={authorName}
            />
            <FormInput
              id="postTitle"
              type="text"
              labelName="Post Title"
              readOnly=""
              change={onPostTitleChange}
              value={postTitle}
            />
            <FormTextarea
              id="postContent"
              type="textarea"
              labelName="Post Content"
              readOnly=""
              rows="8"
              change={onPostContentChange}
              value={postContent}
            ></FormTextarea>
            <FormSelect
              id="postType"
              label="Post Type"
              value={postType}
              change={onPostTypeChange}
              options={["Publish", "Draft"]}
            />
          </Fragment>
        )}

        {state.actionType !== "edit" && (
          <SnackbarContent message={state.deletePost} color="danger" />
        )}
      </Modals>
    </React.Fragment>
  );
};
export default PostModel;
