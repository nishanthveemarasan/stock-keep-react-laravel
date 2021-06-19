/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import Item from "views/Item/Item";
import Sell from "views/Sell/Sell";
import TrackOrder from "views/Sell/TrackOrder";
import Logs from "views/Users/Logs";
import Users from "views/Users/Users";
import Comments from "views/Comments/Comments";
import Posts from "views/Posts/Posts";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/items",
    name: "Products",
    rtlName: "لوحة القيادة",
    icon: LibraryBooks,
    component: Item,
    layout: "/admin",
  },
  {
    path: "/sell",
    name: "Sell History",
    rtlName: "لوحة القيادة",
    icon: LibraryBooks,
    component: Sell,
    layout: "/admin",
  },
  {
    path: "/order-history",
    name: "Track An Order",
    rtlName: "لوحة القيادة",
    icon: LibraryBooks,
    component: TrackOrder,
    layout: "/admin",
  },
  {
    path: "/user-logs",
    name: "Logs",
    rtlName: "لوحة القيادة",
    icon: LibraryBooks,
    component: Logs,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/comments",
    name: "Comments",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Comments,
    layout: "/admin",
  },
  {
    path: "/posts",
    name: "Posts",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Posts,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
];

export default dashboardRoutes;
