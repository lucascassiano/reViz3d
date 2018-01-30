/* eslint no-eval: 0 */
import React, { Component } from "react";
import ReactDOM from "react-dom";

//main UI views
import StarterMenu from "./views/StarterMenu";
import Editor3d from "./views/Editor3d";

// Internal UI components
import TopMenu from "./components/TopMenu";
import RightMenu from "./components/RightMenu";
import RecordMenu from "./components/RecordMenu";

import "semantic-ui-css/semantic.min.css";

import {} from "./styles/App.css";

import AlertContainer from "react-alert";

const electron = window.require("electron"); // little trick to import electron in react
const ipcRenderer = electron.ipcRenderer;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updateReady: false,
            name: "lucas",
            ports: null,
            visible: false,
            serial: null,
            editorOn: false
        };

        console.log("dev", process);

        ipcRenderer.on("updateReady", (event, text) => {
            this.setState({ updateReady: true });
        });

        ipcRenderer.on("ports-data", (event, data) => {
            var ports = data.ports;

            const listItems = ports.map(port => port.comName);

            this.setState({ ports: listItems });
        });

        ipcRenderer.on("fileUpdate", (event, file) => {
            //alert("Update", file);
            //eval(file.toString());
            console.log(file.toString());
        });

        ipcRenderer.on("error", (event, err) => {
            this.showAlert(err, "error");
        });

        this.turnEditorOn = this.turnEditorOn.bind(this);
    }

    turnEditorOn() {
        this.setState({ editorOn: true });
    }

    onClickConnectSerial(serialname, baudrate) {
        console.log("app, serialport", { serial: serialname, baudrate: baudrate });
    }

    componentDidMount() {
        ipcRenderer.send("listSerialPorts");
    }

    showAlert(msg, type) {
        this.msg.show(msg, {
            time: 2000,
            type: type ? type : "success"
        });
    }

    render() {

        const { visible, ports } = this.state;

        return ( <
            div >
            <
            TopMenu / >
            <
            RightMenu ports = { ports }
            onClickConnectSerial = { this.onClickConnectSerial }
            /> <
            Editor3d / >
            <
            RecordMenu / > {
                this.state.editorOn ? null : < StarterMenu onEnd = { this.turnEditorOn }
                />} <
                AlertContainer ref = { a => (this.msg = a) } {...this.alertOptions }
                />{" "} < /
                div >
            );
        }
    }

    export default App;