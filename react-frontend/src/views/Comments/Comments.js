import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import UserModel from "components/Modal/Content/UserModel";
import CommentTable from "components/Table/CommentTable";
import { getCommentData } from "store/comment-slice";
import { commentStoreAction } from "store";
import { getCommentPageData } from "store/comment-slice";
import { getPostData } from "store/post-slice";
const useStyles = makeStyles(styles);
const Comments = () => {
  const mapStateToProps = (state) => {
    return {
      commentData: state.commentStore.commentData,
    };
  };
  useEffect(() => {
    dispatch(getCommentData());
  }, [dispatch]);
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const classes = useStyles();

  const pageChangeHandler = (url) => {
    dispatch(getCommentPageData(url));
  };
  return (
    <GridContainer>
      <UserModel />
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>All Comments</h4>
            <p className={classes.cardCategoryWhite}>
              New employees on 15th September, 2016
            </p>
          </CardHeader>
          <CardBody>
            <CommentTable
              tableData={state.commentData}
              pageChangeHandler={pageChangeHandler}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
export default Comments;
