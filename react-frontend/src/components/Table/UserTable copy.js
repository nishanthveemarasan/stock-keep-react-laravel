import API from "axios/axios";
import React from "react";
import { useDispatch } from "react-redux";
import { orderStoreAction } from "store";
import TablePagination from "./Pagination/Pagination";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { userStoreAction } from "store";
import { useDate } from "hooks/get-date";
const UserTable = (props) => {
  const data = props.tableData.data?.data;
  const pageChangeHandler = (url) => {
    props.pageChangeHandler(url);
  };

  const openModelHandler = (row, type) => {
    dispatch(
      userStoreAction.openModel({
        row: row,
        type: type,
      })
    );
  };

  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created at</th>
            <th>Status</th>
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
                  <td>{row.username}</td>
                  <td>{row.email}</td>
                  <td>{row.roles}</td>
                  <td>{useDate(row.created_at)}</td>
                  <td>{row.status}</td>
                  <td>
                    <span
                      className="badge badge-secondary m-md-1"
                      onClick={openModelHandler.bind(null, row, "assignRoles")}
                    >
                      <PersonAddIcon />
                    </span>
                    <span
                      className="badge badge-danger"
                      onClick={openModelHandler.bind(null, row, "delete")}
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

export default UserTable;
