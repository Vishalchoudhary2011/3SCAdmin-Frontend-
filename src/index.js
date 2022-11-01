import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store";
import "./i18n";

// render micro frontend function
window.rendercreatereactapp = (containerId, history) => {
  ReactDOM.createRoot(
    <App history={history} />,
    document.getElementById(containerId)
  );
  serviceWorker.unregister();
};

// unmount micro frontend function
window.unmountcreatereactapp = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

const root = ReactDOM.createRoot(document.getElementById("admin"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
