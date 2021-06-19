import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
const app = <App />;

if (document.getElementById("root")) {
    ReactDOM.render(app, document.getElementById("root"));
}
