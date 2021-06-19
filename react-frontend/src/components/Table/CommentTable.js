import React from "react";
import FormCheckout from "components/UI/FormCheckout";
import { useDate } from "hooks/get-date";
import TablePagination from "./Pagination/Pagination";
const CommentTable = (props) => {
  const data = props.tableData.data?.data;
  const pageChangeHandler = (url) => {
    if (url !== null) {
      props.pageChangeHandler(url);
    }
  };
  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>
              <FormCheckout id="comment-checkout" name="checkbox" value="all" />
            </th>
            <th>Author</th>
            <th>Post Title</th>
            <th>Comment</th>
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
                  <td>
                    {" "}
                    <FormCheckout
                      id={`comment-checkout-${row.id}`}
                      name="checkbox"
                      value={row.id}
                    />
                  </td>
                  <td>{row.name}</td>
                  <td>{row.title}</td>
                  <td>{row.content}</td>
                  <td>{useDate(row.created_at)}</td>
                  <td>{row.status}</td>
                  <td>diable|enable</td>
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

export default CommentTable;
