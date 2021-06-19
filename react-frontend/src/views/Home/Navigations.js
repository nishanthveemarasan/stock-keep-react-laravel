import Posts from "./content/Posts";
import Login from "./content/Login";
import Dashboard from "views/Dashboard/Dashboard";
import Products from "./content/Products";
const NavigationPath = [
  {
    path: "/posts",
    component: { Posts },
    name: "Posts",
  },
  {
    path: "/products",
    component: { Products },
    name: "Products",
  },
  {
    path: "/login",
    component: { Login },
    name: "Login",
  },
  {
    path: "/admin/dashboard",
    component: { Dashboard },
    name: "Admin",
  },
];

export default NavigationPath;
