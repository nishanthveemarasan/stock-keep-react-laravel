import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostContent from "./PostContent";
import MainNavigation from "../MainNavigation";
import { getPostData } from "store/post-slice";
const Posts = () => {
  const dispatch = useDispatch();
  const mapStateToProps = (state) => {
    return {
      postData: state.postStore.postData,
    };
  };
  const state = useSelector(mapStateToProps);
  useEffect(() => {
    dispatch(getPostData());
  }, []);

  return (
    <React.Fragment>
      <MainNavigation />
      <div className="container">
        <PostContent postData={state.postData} />
      </div>
    </React.Fragment>
  );
};
export default Posts;
