import React, { Fragment, useEffect } from "react";
import { ThumsUpButton, ThumbDownButton } from "components/UI/LikeButton";
import { useSelector, useDispatch } from "react-redux";
import { getLikesData } from "store/like-slice";
import { updateLikesData } from "store/like-slice";

const Likes = (props) => {
  const postId = props.postid;
  const userId = 1;
  console.log(postId);
  const mapStateToProps = (state) => {
    return {
      isUserLiked: state.likeStore.isUserLiked,
      postLiked: state.likeStore.postLiked,
      didDataChanged: state.likeStore.didDataChanged,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  useEffect(() => {
    if (state.didDataChanged) {
      const data = {
        userId,
        postId,
      };
      dispatch(getLikesData(data));
    }
  }, [state.didDataChanged, dispatch]);

  const doLikeHandler = () => {
    const data = {
      userId,
      postId,
      status: state.isUserLiked,
    };
    console.log(data, state);
    dispatch(updateLikesData(data));
  };
  const doUnLikeHandler = () => {
    const data = {
      userId,
      postId,
      status: state.isUserLiked,
    };
    console.log(data, state);
    dispatch(updateLikesData(data));
  };

  return (
    <Fragment>
      {!state.isUserLiked && (
        <ThumsUpButton likes={state.postLiked} onClick={doLikeHandler} />
      )}
      {state.isUserLiked && (
        <ThumbDownButton likes={state.postLiked} onClick={doUnLikeHandler} />
      )}
    </Fragment>
  );
};
export default Likes;
