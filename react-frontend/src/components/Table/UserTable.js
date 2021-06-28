import API from "axios/axios";
import React from "react";
import { useDispatch } from "react-redux";
import { orderStoreAction } from "store";
import TablePagination from "./Pagination/Pagination";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { userStoreAction } from "store";
import { makeStyles } from "@material-ui/core/styles";
import { useDate } from "hooks/get-date";
import Button from "react-bootstrap/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import profileImage from "assets/img/profile.jpg";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};
const useStyles = makeStyles(styles);
const UserTable = (props) => {
  const classes = useStyles();
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
      <div className="row mt-4">
        {data &&
          data.map((row, index) => {
            return (
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <Card profile>
                  <CardAvatar profile>
                    <label>
                      <img
                        src={
                          row.profile_photo_path
                            ? row.profile_photo_path
                            : profileImage
                        }
                        alt="..."
                      />
                    </label>
                  </CardAvatar>
                  <CardBody profile>
                    <h6 className={classes.cardCategory}>
                      {row.job_title ? row.job_title : "JOB TITLE"}
                    </h6>
                    <h4 className={classes.cardTitle}>
                      {`${row.name} ${row.last_name ? row.last_name : ""}`}
                    </h4>
                    <h4 className={classes.cardTitle}>
                      {row.phone ? row.phone : ""}
                    </h4>
                    <h4 className={classes.cardTitle}>{row.email}</h4>
                    <h4 className={classes.cardTitle}>
                      {row.country ? row.country : ""}
                    </h4>
                    <h4 className={classes.cardTitle}>
                      {row.roles ? row.roles : ""}
                    </h4>
                    <p className={classes.description}>
                      {row.about_me ? row.about_me : "NO DESCRIPTION IS GIVEN"}
                    </p>
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
                  </CardBody>
                </Card>
              </div>
            );
          })}
      </div>

      {/* {data &&
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
            })} */}

      <TablePagination
        paginationData={props.tableData}
        pageChangeHandler={pageChangeHandler}
      />
    </React.Fragment>
  );
};

export default UserTable;
