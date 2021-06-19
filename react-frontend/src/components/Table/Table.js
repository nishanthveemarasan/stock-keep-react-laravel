import React, { Fragment } from "react";
import Pagination from "./Pagination";

const Table = (props) => {
  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Order No</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.tableData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.order_number}</td>
                <td>{item.itemname}</td>
                <td>{item.sellcount}</td>
                <td>{item.sell_type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Table;
