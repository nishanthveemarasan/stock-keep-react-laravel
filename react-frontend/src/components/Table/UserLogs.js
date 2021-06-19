import React from "react";
import TablePagination from "components/Table/Pagination/Pagination";
import { useDate } from "hooks/get-date";
const UserLogs = (props) => {
  const data = props.tableData.data?.data;
  const pageChangeHandler = (url) => {
    props.pageChangeHandler(url);
  };
  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Action</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.action}</td>
                  <td>{row.description}</td>
                  <td>{useDate(row.created_at)}</td>
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

export default UserLogs;
