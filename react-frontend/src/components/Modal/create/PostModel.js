import React, { useState } from "react";
import Modals from "components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { postStoreAction } from "store";
import useInut from "hooks/user-input";
import FormInput from "components/UI/FormInput";
import FormSelect from "components/UI/FormSelect";
import FormTextarea from "components/UI/FormTextarea";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import API from "axios/axios";
const PostModel = (props) => {
  const {
    enteredInput: authorName,
    setEnteredInput: setAuthorName,
    onInputChangeHandler: onAuthorNameChange,
  } = useInut("Nishanth");
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
  } = useInut("publish");
  const [post, setPost] = useState({
    isLoading: false,
    alertText: "",
    progressPercentage: "50%",
    alertType: "",
  });
  const mapStateToProps = (state) => {
    return {
      iscreatePostMdelOpen: state.postStore.iscreatePostMdelOpen,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const onHideHandler = () => {
    dispatch(postStoreAction.closeCreatePostModel());
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      user_id: 1,
      title: postTitle,
      content: postContent,
      status: postType,
    };
    setPost((prevState) => {
      return {
        ...prevState,
        isLoading: true,
        alertText: "",
      };
    });
    API.post(`posts/create`, data, {
      onDownloadProgress: (progressEvent) => {
        let progress = `${Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        )}%`;
        setPost((prevState) => {
          return {
            ...prevState,
            progressPercentage: progress,
          };
        });
      },
    })
      .then((response) => {
        console.log(response);
        const status = response.data.http_status;
        if (status === 200) {
          const msg = response.data.data.msg;
          dispatch(postStoreAction.dataDidChanged());
          setPost((prevState) => {
            return {
              ...prevState,
              alertText: msg,
              alertType: "success",
              isLoading: false,
              progressPercentage: "50%",
            };
          });
        }
        setPostTitle("");
        setPostContent("");
      })
      .catch();
  };
  return (
    <React.Fragment>
      <Modals
        onShow={state.iscreatePostMdelOpen}
        onHideHandler={onHideHandler}
        onActionHandler={onSubmitHandler}
        heading="Create A Post"
        actionName={post.isLoading ? post.progressPercentage : "Create"}
        size="lg"
      >
        {post.isLoading && (
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${post.progressPercentage}` }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        )}
        {post.alertText && (
          <SnackbarContent
            message={post.alertText}
            color={`${post.alertType}`}
          />
        )}
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
      </Modals>
    </React.Fragment>
  );
};
export default PostModel;
