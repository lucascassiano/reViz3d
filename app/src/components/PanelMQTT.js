import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleRecordMenu } from "../actions/menus";
import Toggle from "./ui/Toggle";
import InputText from "./ui/InputText";

class PanelMQTT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            recording: false,
            showModal: false,
            selectedFrame: 0,
            playing: true
        };
    }

    render() {
            return ( <
                div >
                <
                Toggle text = "real-time loader"
                active = { true }
                /> <
                InputText placeHolder = "select mqtt url" / >
                <
                Toggle text = "real-time loader 1"
                active = { true }
                /> <
                Toggle text = "real-time loader 2"
                active = { true }
                /> <
                Toggle text = "real-time loader 3"
                active = { true }
                /> <
                /div>);
            }

        }
        // Maps state from store to props
    const mapStateToProps = (state, ownProps) => {
        return {
            // You can now say this.props.rightMenu_isOpen
            recordMenu_isOpen: state.menus.recordMenu_isOpen
        };
    };

    // Maps actions to props
    const mapDispatchToProps = dispatch => {
        return {
            toggleRecordMenu: isOpen => dispatch(toggleRecordMenu())
        };
    };

    // Use connect to put them together
    export default connect(mapStateToProps, mapDispatchToProps)(PanelMQTT);