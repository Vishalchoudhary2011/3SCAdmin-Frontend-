import "./style/sass/main.scss";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routers/Routing";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultHistory = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <BrowserRouter history={defaultHistory}>
        <Routing />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
