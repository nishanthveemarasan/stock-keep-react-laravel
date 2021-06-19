import API from "axios/axios";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { productStoreAction } from "store";
const Pagination = (props) => {
  const links = props.paginationData.data?.links;
  const to = props.paginationData.data?.to;
  const total = props.paginationData.data?.total;
  const dispatch = useDispatch();
  const pageChangeHandler = (url) => {
    if (url !== null) {
      const param = url.split("?");
      API.get(`get-all-chairs?${param[1]}`)
        .then((response) => {
          dispatch(
            productStoreAction.getChairs({
              chairs: response.data,
            })
          );
        })
        .catch();
    }
  };
  return (
    <Fragment>
      <nav className="d-flex justify-content-end">
        <div className="align-self-center mr-3 font-weight-bold">
          <span>{to && to} of </span>
          <span>{total && total}</span>
        </div>
        <ul className="pagination">
          {links &&
            links.map((link, index) => {
              return (
                <li
                  key={index}
                  className={`page-item ${link.active && "active"}`}
                >
                  {index === 0 && (
                    <span
                      className="page-link"
                      onClick={pageChangeHandler.bind(null, link.url)}
                    >
                      &laquo;
                    </span>
                  )}
                  {index === links.length - 1 && (
                    <span
                      className="page-link"
                      onClick={pageChangeHandler.bind(null, link.url)}
                    >
                      &raquo;
                    </span>
                  )}
                  {index !== 0 && index !== links.length - 1 && (
                    <span
                      className="page-link"
                      onClick={pageChangeHandler.bind(null, link.url)}
                    >
                      {link.label}
                    </span>
                  )}
                </li>
              );
            })}
          {/* <li className="page-item disabled">
            <span className="page-link">Previous</span>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item active">
            <span className="page-link">
              2<span className="sr-only">(current)</span>
            </span>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li> */}
        </ul>
      </nav>
    </Fragment>
  );
};
export default Pagination;
