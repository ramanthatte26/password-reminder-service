import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  </React.StrictMode>
);
