import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import PostTable from "components/Table/PostTable";
import { getPostData } from "store/post-slice";
import { getPostPageData } from "store/post-slice";
import { postStoreAction } from "store";
import PostModel from "components/Modal/create/PostModel";
const useStyles = makeStyles(styles);
const Posts = () => {
  const mapStateToProps = (state) => {
    return {
      postData: state.postStore.postData,
    };
  };
  useEffect(() => {
    dispatch(getPostData());
  }, [dispatch]);
  const dispatch = useDispatch();
  const state = useSelector(mapStateToProps);
  const classes = useStyles();

  const pageChangeHandler = (url) => {
    dispatch(getPostPageData(url));
  };

  const onOpenCreatePostHandler = () => {
    dispatch(postStoreAction.createPostModel());
  };
  return (
    <Fragment>
      <PostModel />
      <div className="text-right">
        <Button color="success" onClick={onOpenCreatePostHandler}>
          Create a Post
        </Button>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>All Posts</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <PostTable
                tableData={state.postData}
                pageChangeHandler={pageChangeHandler}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};
export default Posts;
