import React, { useRef } from "react";
import { useSelector } from "react-redux";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { FormInputWithoutLabel } from "./FormInput";
import { FormSelectWithoutLabel } from "./FormSelect";
const OrderList = (props) => {
  const listData = props.orderList;
  const onRemoveListHandler = (index) => {
    props.onRemoveListHandler(index);
  };
  return (
    <React.Fragment>
      {props.listData &&
        props.listData.map((data, index) => {
          return (
            <div className="row" key={index}>
              <div className="col-md-4">
                <FormInputWithoutLabel
                  type="text"
                  id={`listName-${index}`}
                  readOnly="true"
                  value={data.name}
                  change={(e) => props.nameChangeHandler(e, index)}
                />
              </div>
              <div className="col-md-3">
                <FormSelectWithoutLabel
                  id={`listStatus-${index}`}
                  value={data.status}
                  change={(e) => props.statusChangeHandler(e, index)}
                  options={["Received", "Processing", "Packed", "Sent"]}
                />
              </div>
              <div className="col-md-2">
                {" "}
                <FormInputWithoutLabel
                  type="number"
                  id={`listNumber-${index}`}
                  readOnly=""
                  value={data.quantity}
                  change={(e) => props.quantityChangeHandler(e, index)}
                />
              </div>
              <div className="col-md-2">
                <span
                  className="badge badge-danger"
                  onClick={onRemoveListHandler.bind(null, index)}
                >
                  <DeleteForeverRoundedIcon />
                </span>
              </div>
            </div>
          );
        })}
    </React.Fragment>
  );
};

export default OrderList;
