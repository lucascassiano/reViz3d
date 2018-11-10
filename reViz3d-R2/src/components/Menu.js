import React, { Component } from 'react';
import { toggleMenu } from "../store";
import { connect } from "react-redux";
import { } from "./menu.less";

class Menu extends Component {
    render() {
        let menuClass = this.props.open ? "menu" : "menu-hidden";
        let environment = this.props.environment;

        console.log("env", environment);

        let selectedObject = "select a object...";
        if (environment.selectedObject)
            selectedObject = this.props.environment.selectedObject;

        return <div className="side-menu">
            <div className="btn">
                A
            </div>
        </div>
    }

}

const mapStateToProps = state => {
    return {
        menu: state.menuIsOpen,
        environment: state.environment
    }
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
)(Menu)
