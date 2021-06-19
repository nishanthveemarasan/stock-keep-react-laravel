import React, { Fragment } from "react";
import Pagination from "./Pagination";

const PopTable = (props) => {
  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Total Sell Count</th>
          </tr>
        </thead>
        <tbody>
          {props.tableData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{(index += 1)}</td>
                <td>{item.total}</td>
                <td>{item.itemname}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default PopTable;
