import API from "axios/axios";
import React from "react";
import { useDispatch } from "react-redux";
import { orderStoreAction } from "store";
import TablePagination from "./Pagination/Pagination";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { useDate } from "hooks/get-date";

const OrderTable = (props) => {
  const data = props.tableData.data?.data;

  const dispatch = useDispatch();
  const pageChangeHandler = (url) => {
    if (url !== null) {
      const param = url.split("?");
      API.get(`order/get-order-data?${param[1]}`)
        .then((response) => {
          dispatch(
            orderStoreAction.getOrderData({
              data: response.data,
            })
          );
        })
        .catch();
    }
  };

  const openModelHandler = (id, type) => {
    dispatch(
      orderStoreAction.openModal({
        id,
        type,
      })
    );
  };
  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Order Number</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Order Created</th>
            <th>Sell Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.order_number}</td>
                  <td>{order.itemname}</td>
                  <td>{order.sellcount}</td>
                  <td>{useDate(order.created_at)}</td>
                  <td>{order.sell_type}</td>
                  <td>
                    <span
                      className="badge badge-secondary m-md-1"
                      onClick={openModelHandler.bind(null, order.id, "update")}
                    >
                      <BorderColorRoundedIcon />
                    </span>
                    <span
                      className="badge badge-danger"
                      onClick={openModelHandler.bind(null, order.id, "delete")}
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

export default OrderTable;
