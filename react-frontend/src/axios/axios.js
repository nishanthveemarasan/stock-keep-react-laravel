import axios from "axios";

const API = axios.create({
  baseURL: "http://relaxreact.test/react-backend/public/api/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default API;
