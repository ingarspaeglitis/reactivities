import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.min.css";
import "./app/layout/styles.css";
import App from "./app/layout/App";

import ScrollToTop from "./app/layout/ScrollToTop";
import reportWebVitals from "./reportWebVitals";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop />
    <App />
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
