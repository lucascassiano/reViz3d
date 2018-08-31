import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import logo from "./icons/logo.svg";

export default class App extends Component {
    render() {
        return (
            <div>Hello from React <img src={logo} /></div >
        );
    }
}

