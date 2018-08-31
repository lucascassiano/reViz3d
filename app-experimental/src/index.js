import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from "./App.js";

const render = () => {
    ReactDOM.render(<AppContainer><App /></AppContainer>, window.document.getElementById('app'));
}
if (typeof window !== 'undefined') { render(); }


if (module.hot) {
    module.hot.accept(render);
}