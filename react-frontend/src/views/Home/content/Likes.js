import React, { Fragment, useEffect, useState } from "react";
import { ThumsUpButton, ThumbDownButton } from "components/UI/LikeButton";
import { useSelector, useDispatch } from "react-redux";
import { getLikesData } from "store/like-slice";
import { updateLikesData } from "store/like-slice";
import API from "axios/axios";

const Likes = (props) => {
  const postId = props.postid;
  const userId = 1;
  const [likeState, setLikeState] = useState({
    isUserLiked: false,
    likeCount: 0,
    dataChanged: true,
  });
  useEffect(() => {
    const data = {
      userId,
      postId,
    };
    if (likeState.dataChanged) {
      API.post("likes/is-post-liked", data)
        .then((response) => {
          if (response.data.http_status == "200") {
            const liked = response.data.data?.userLiked;
            const likeCount = response.data.data?.postLikes;

            setLikeState((prevState) => {
              return {
                ...prevState,
                isUserLiked: liked,
                likeCount: likeCount,
                dataChanged: false,
              };
            });
          }
        })
        .catch();
    }
  }, [likeState.dataChanged]);
  const doLikeHandler = () => {
    const data = {
      userId,
      postId,
      status: likeState.isUserLiked,
    };
    API.post("likes/update-user-like", data)
      .then((response) => {
        if (
          response.data.http_status == "200" &&
          response.data.data.status === "success"
        ) {
          console.log("data has been updated");
          setLikeState((prevState) => {
            return {
              ...prevState,
              dataChanged: true,
            };
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const doUnLikeHandler = () => {
    const data = {
      userId,
      postId,
      status: likeState.isUserLiked,
    };
    API.post("likes/update-user-like", data, {
      onUploadProgress: (ProgressEvent) => {
        console.log(
          "upload progress " +
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
      },
    })
      .then((response) => {
        if (
          response.data.http_status == "200" &&
          response.data.data.status === "success"
        ) {
          console.log("data has been updated");
          setLikeState((prevState) => {
            return {
              ...prevState,
              dataChanged: true,
            };
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <Fragment>
      {/* {postId} {likeState.likeCount}{" "} */}
      {!likeState.isUserLiked && (
        <ThumsUpButton likes={likeState.likeCount} onClick={doLikeHandler} />
      )}
      {likeState.isUserLiked && (
        <ThumbDownButton
          likes={likeState.likeCount}
          onClick={doUnLikeHandler}
        />
      )}
    </Fragment>
  );
};
export default Likes;
