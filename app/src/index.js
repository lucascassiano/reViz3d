import React from "react";
import ReactDOM from "react-dom";

import registerServiceWorker from "./utilities/registerServiceWorker";

import "bootstrap/dist/css/bootstrap.css";
import App from "./App";

import { Provider } from "react-redux";
//import {createStore} from 'redux';
import configureStore from "./store/configureStore";
//import reducers from "./reducers/index";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

//registerServiceWorker();
