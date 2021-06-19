import React from "react";
import { useDispatch } from "react-redux";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { productStoreAction } from "store";
import { useDate } from "hooks/get-date";
const ProductTable = (props) => {
  const chairData = props.tableData.data?.data;

  const dispatch = useDispatch();
  const openModelHandler = (id, type) => {
    dispatch(
      productStoreAction.openChairModal({
        value: id,
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
            <th>Item Name</th>
            <th>Item Code</th>
            <th>Current Stock</th>
            <th>Last Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {chairData &&
            chairData.map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.itemname}</td>
                  <td>{row.itemcode}</td>
                  <td>{row.count}</td>
                  <td>{useDate(row.updated_at)}</td>
                  <td>
                    <span
                      className="badge badge-secondary m-md-1"
                      onClick={openModelHandler.bind(null, row.id, "update")}
                    >
                      <BorderColorRoundedIcon />
                    </span>
                    <span
                      className="badge badge-danger"
                      onClick={openModelHandler.bind(null, row.id, "delete")}
                    >
                      <DeleteForeverRoundedIcon />
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default ProductTable;
