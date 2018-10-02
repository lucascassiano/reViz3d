import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from "react-redux";

import App from "./App.js";
import "./index.css";


//export let actions = new Actions(store);
import store from "./store";

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>,
        window.document.getElementById('app'));
}
if (typeof window !== 'undefined') { render(); }

if (module.hot) {
    module.hot.accept(render);
}

window.focus();

//execute the viewer
import './viewer/viewer.js';
//let viewer = new Viewer(store);



