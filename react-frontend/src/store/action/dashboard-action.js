import { dashboardActions } from "../index";
import API from "axios/axios";
export const getDashboardData = () => {
  (dispatch) => {
    API.get("get-dashboard-data")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};
