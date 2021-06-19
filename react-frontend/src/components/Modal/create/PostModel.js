import React from "react";
import Modals from "components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { postStoreAction } from "store";
const PostModel = (props) => {
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
  const onSubmitHandler = (event) => {};
  return (
    <React.Fragment>
      <Modals
        onShow={state.iscreatePostMdelOpen}
        onHideHandler={onHideHandler}
        onActionHandler={onSubmitHandler}
        heading="Create A Post"
        actionName="Create"
      ></Modals>
    </React.Fragment>
  );
};
export default PostModel;
