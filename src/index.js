import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Assets/CSS/index.css";
import theme from "./Assets/Theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import store from "./Redux/App/Store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
        <ToastContainer
          // position="bottom-right"
          autoClose={1500}
          hideProgressBar={true}
          theme="dark"
        />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
