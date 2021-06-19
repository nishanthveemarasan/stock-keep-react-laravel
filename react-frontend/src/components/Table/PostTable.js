import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDate } from "hooks/get-date";
import TablePagination from "./Pagination/Pagination";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import { postStoreAction } from "store";
import PostModel from "components/Modal/Content/PostModel";
const PostTable = (props) => {
  const data = props.tableData.data?.data;
  const pageChangeHandler = (url) => {
    if (url !== null) {
      props.pageChangeHandler(url);
    }
  };
  const dispatch = useDispatch();
  const openModelHandler = (rowData, actionType) => {
    dispatch(
      postStoreAction.modelOpen({
        data: rowData,
        type: actionType,
      })
    );
  };
  return (
    <React.Fragment>
      <PostModel />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Auther</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created at</th>
            <th>Status</th>
            <th>Comments</th>
            <th>Likes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.title}</td>
                  <td>{row.status}</td>
                  <td>{useDate(row.created_at)}</td>
                  <td>{row.type}</td>
                  <td>{row.comments_count}</td>
                  <td>{row.likes_count}</td>
                  <td>
                    <span
                      className="badge badge-secondary m-md-1"
                      onClick={openModelHandler.bind(null, row, "edit")}
                    >
                      <BorderColorRoundedIcon />
                    </span>
                    <span
                      className="badge badge-danger"
                      onClick={openModelHandler.bind(null, row, "disable")}
                    >
                      <DeleteForeverRoundedIcon />
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <TablePagination
        paginationData={props.tableData}
        pageChangeHandler={pageChangeHandler}
      />
    </React.Fragment>
  );
};

export default PostTable;
