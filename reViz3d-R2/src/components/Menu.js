import React, { Component } from 'react';
import { Button, Card, Classes, Elevation, H5, Label, Slider, Switch, Tab, TabId, Tabs, Icon, ContextMenu, ContextMenuTarget, NumericInput, ControlGroup, InputGroup } from "@blueprintjs/core";
import { toggleMenu } from "../store";
import { connect } from "react-redux";

class ObjectsMenu extends Component {
    xChange = (value) => {
        let { object } = this.props;
        object.position.x = value;
    }

    yChange = (value) => {
        let { object } = this.props;
        object.position.y = value;
    }

    zChange = (value) => {
        let { object } = this.props;
        object.position.z = value;
    }

    rxChange = (value) => {
        let { object } = this.props;
        object.rotation.x = value;
    }

    ryChange = (value) => {
        let { object } = this.props;
        object.rotation.y = value;
    }

    rzChange = (value) => {
        let { object } = this.props;
        object.rotation.z = value;
    }

    render() {
        let { object } = this.props;

        let name = object ? object.name : null;
        let position = object ? object.position : { x: 0, y: 0, z: 0 };
        let rotation = object ? object.rotation : { x: 0, y: 0, z: 0 };


        return (
            <div className="menu-object">
                <h2>{name}</h2>
                position
                <div className="menu-position">

                    <div className="menu-position-cell">
                        x
                        <NumericInput fill={true} value={position ? position.x : 0} onValueChange={this.xChange} />
                    </div>
                    <div className="menu-position-cell">
                        y
                        <NumericInput fill={true} value={position ? position.y : 0} onValueChange={this.yChange} />
                    </div>
                    <div className="menu-position-cell">
                        z
                        <NumericInput fill={true} value={position ? position.z : 0} onValueChange={this.zChange} />
                    </div>
                </div>

                rotation
                <div className="menu-position">

                    <div className="menu-position-cell">
                        x
                        <NumericInput fill={true} value={rotation ? rotation.x : 0} onValueChange={this.rxChange} />
                    </div>
                    <div className="menu-position-cell">
                        y
                        <NumericInput fill={true} value={rotation ? rotation.y : 0} onValueChange={this.ryChange} />
                    </div>
                    <div className="menu-position-cell">
                        z
                        <NumericInput fill={true} value={rotation ? rotation.z : 0} onValueChange={this.rzChange} />
                    </div>
                </div>

            </div>
        );
    }
}

class Menu extends Component {
    render() {
        let menuClass = this.props.open ? "menu" : "menu-hidden";
        let environment = this.props.environment;

        console.log("env", environment);

        let selectedObject = "select a object...";
        if (environment.selectedObject)
            selectedObject = this.props.environment.selectedObject;

        return <div>
            <Icon
                icon="caret-right"
                className={this.props.open ? "menu-caret-open" : "menu-caret-closed"}
                onClick={toggleMenu}
                iconSize={20}
            />

            <div className={menuClass}>
                <Card className={Classes.DARK + " content"}>
                    < Tabs className="tabs">
                        <Tab id="rx" title="Objects" panel={<ObjectsMenu object={selectedObject} />} />
                        <Tab id="ng" title="Data" panel={<div>Angular</div>} />
                        <Tab id="mb" title="Project" panel={<div>hiiii</div>} />
                        <Tabs />
                    </Tabs>
                </Card>
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
