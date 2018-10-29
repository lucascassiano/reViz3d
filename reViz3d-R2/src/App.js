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

import { Slider2D, LineEditor, CircularSlider, Collapsible } from "./controls";
//import "./controls/controls.less";

class App extends Component {
    onChange = (event) => {
        //console.log("chage", event);
        window.pos3d = { x: event.x, y: event.y };
    }

    render() {
        console.log('props', this.props);
        return (
            <div className="controls-menu">
                <div className="panel">
                    <Slider2D onChange={this.onChange} />
                    <LineEditor points={[0, 1, 2, 2, 5, 2]} />
                    <Collapsible label="Circular Slider">
                        <CircularSlider />
                    </Collapsible>
                </div >
            </div>
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

