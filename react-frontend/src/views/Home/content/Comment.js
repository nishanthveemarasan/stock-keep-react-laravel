import React, { useState, useEffect } from "react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { useDate } from "hooks/get-date";
import FormTextarea from "components/UI/FormTextarea";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "axios/axios";
import TablePagination from "components/Table/Pagination/Pagination";
import CommentPagination from "components/Table/Pagination/CommentPagination";
// import { WriteComment } from "./Comment";
export const PostComment = (props) => {
  const [getComment, setGetComment] = useState({
    comments: [],
    dataChange: true,
  });
  useEffect(() => {
    if (getComment.dataChange) {
      API.get(`comments/get-post-comment/${props.id}`)
        .then((response) => {
          if (response.data.http_status == "200") {
            setGetComment((prevState) => {
              return {
                ...prevState,
                comments: response.data.data,
                dataChange: false,
              };
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [getComment.dataChange]);
  const pageChangeHandler = (url) => {
    if (url !== null) {
      const param = url.split("?");
      API.get(`comments/get-post-comment/${props.id}?${param[1]}`)
        .then((response) => {
          if (response.data.http_status == "200") {
            setGetComment((prevState) => {
              return {
                ...prevState,
                comments: response.data.data,
                dataChange: false,
              };
            });
          }
        })
        .catch();
    }
  };
  const onSubmitHandler = (data) => {
    API.post("comments/create", data)
      .then((response) => {
        if (
          response.data.http_status == "200" &&
          response.data.data.msg === "success"
        ) {
          setGetComment((prevState) => {
            return {
              ...prevState,
              dataChange: true,
            };
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <React.Fragment>
      {getComment.comments?.data &&
        getComment.comments.data.length > 0 &&
        getComment.comments.data.map((row, index) => {
          return (
            <div key={index}>
              <h6 className="font-weight-bolder text-primary">
                {row.name}{" "}
                <small className="font-italic">
                  On {useDate(row.created_at)}
                </small>
              </h6>
              <p className="mt-2">{row.content}</p>
            </div>
          );
        })}
      <CommentPagination
        paginationData={getComment.comments}
        pageChangeHandler={pageChangeHandler}
      />
      <br />
      {getComment.comments.length === 0 && (
        <span className="text-primary font-italic">
          no comment yet for this post
        </span>
      )}
      <WriteComment onSubmitHandler={onSubmitHandler} id={props.id} />
    </React.Fragment>
  );
};

export const WriteComment = (props) => {
  const [comment, setComment] = useState("");
  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      user_id: 1,
      post_id: props.id,
      content: comment,
    };
    props.onSubmitHandler(data);
  };
  return (
    <React.Fragment>
      <Card style={{ width: "50%" }}>
        <CardBody>
          <Form onSubmit={onSubmitHandler}>
            <FormTextarea
              id={`writeComment-${props.id}`}
              type="textarea"
              labelName="Leave Your Comment Here"
              readOnly=""
              rows="3"
              change={onCommentChange}
              value={comment}
            ></FormTextarea>
            <Button variant="secondary" type="submit">
              Submit Your Comment
            </Button>
          </Form>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
