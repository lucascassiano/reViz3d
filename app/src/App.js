/* eslint no-eval: 0 */
import React, { Component } from "react";
import ReactDOM from "react-dom";

import Toolbar from "react-minimalist-toolbar";

// Internal UI components
import TopMenu from "./components/TopMenu";
import RightMenu from "./components/RightMenu";
import Editor3d from "./components/Editor3d.js";
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
      serial: null
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
    const menu = [
      {
        text: "File",
        items: [
          {
            text: "New Project",
            callback: this.newFile
          },
          {
            text: "Save Project",
            callback: this.openFile
          },
          {
            text: "Open Project",
            callback: this.openFile
          },
          {
            text: "Export React Component",
            callback: this.openFile
          }
        ]
      },
      {
        text: "View",
        items: [
          {
            text: "Data Layers",
            callback: this.toggleVisibility
          },
          {
            text: "List Devices",
            callback: this.redo
          }
        ]
      },
      {
        text: "Export",
        items: [
          {
            text: "React Component",
            callback: this.undo
          },
          {
            text: "Electron Project",
            callback: this.redo
          }
        ]
      },
      {
        text: "About",
        items: [
          {
            text: "Experimental 3",
            callback: this.undo
          },
          {
            text: "React",
            callback: this.redo
          },
          {
            text: "Electron",
            callback: this.redo
          },
          {
            text: "Three.js",
            callback: this.redo
          },
          {
            text: "Project Github",
            callback: this.redo
          }
        ]
      }
    ];

    const { visible, ports } = this.state;

    return (
      <div>
        <TopMenu />
        <RightMenu
          ports={ports}
          onClickConnectSerial={this.onClickConnectSerial}
        />{" "}
        <Editor3d /> 
        <RecordMenu />
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />{" "}
      </div>
    );
  }
}

export default App;
