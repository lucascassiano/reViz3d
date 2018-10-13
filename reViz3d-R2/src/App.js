import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import logo from "./icons/logo.svg";
import github from "./icons/github.svg";
import { shell } from 'electron';

import "./app.css";
import { connect } from 'react-redux';
import { toggleMenu } from "./store";

//import Menu from "./components/Menu";

class App extends Component {
    /*
    onClick = () => {
        toggleMenu();
    }*/

    render() {
        console.log('props', this.props);
        return (
            <div >
                
            </div >
        );
    }
}

const mapStateToProps = state => {
    return { menu: state.menuIsOpen }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleMenu: () => {
            dispatch({ type: 'TOGGLE_MENU', open: null });
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

