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

//Menu
const { remote } = require('electron');
const { Menu, MenuItem } = remote;

const menu = new Menu()
menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup({ window: remote.getCurrentWindow() })
}, false);



