import React, { Component } from "react";
import ReactDOM from "react-dom";
//import PanelSerial from "./PanelSerial";
//import { Dropdown, Button } from "semantic-ui-react";
import icon_reload from "../assets/white_reload.svg";
import { Grid, Image } from "semantic-ui-react";
import moment from "moment";
import AlertContainer from "react-alert";

import {
  InputGroup,
  InputGroupButton,
  InputGroupAddon,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

const electron = window.require("electron"); // little trick to import electron in react
const ipcRenderer = electron.ipcRenderer;

export default class RightMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Select Port",
      portName: null,
      baud: null,
      selected: null,
      dropdownOpen: false,
      dropdownBaudsOpen: false,
      open: false,
      receivedData: [],
      displayedData: [],
      displayData: false
    };
    this.onClickConnectSerial = this.onClickConnectSerial.bind(this);
    this.onClickOption = this.onClickOption.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleBauds = this.toggleBauds.bind(this);
    this.onClickOptionBauds = this.onClickOptionBauds.bind(this);
    this.onClickCloseSerial = this.onClickCloseSerial.bind(this);
    this.onClickClearConsole = this.onClickClearConsole.bind(this);
    this.autoScrollConsole = this.autoScrollConsole.bind(this);
    this.toggleDisplayData = this.toggleDisplayData.bind(this);
    this.bauds = [
      110,
      300,
      600,
      1200,
      2400,
      4800,
      9600,
      14400,
      19200,
      28800,
      38400,
      56000,
      115200
    ];

    //Register Events
    ipcRenderer.on("test", (event, output) => {
      console.log("works", output);
    });

    ipcRenderer.on("serialport-error", (event, err) => {
      //log error here
      console.error("serial error", err);
      this.setState({ open: false });
    });

    ipcRenderer.on("serialport-isOpen", (event, isOpen) => {
      //console.log("Port is Open");

      if (isOpen) {
        this.showAlert("Serial Port Open");
      } else {
        this.showAlert("Serial Port Closed");
      }

      this.setState({ open: isOpen });
    });

    ipcRenderer.on("serialport-data", (event, data) => {
      //console.log("data received from Serial", data);
      var receivedData = this.state.receivedData;
      var displayedData = [];

      var date = moment().format("MM/DD/YYYY, hh:mm:ss");
      receivedData.push("timestamp:\""+date + "\"," + data);
      receivedData.push("\r\n");

      if (this.state.displayData) displayedData = receivedData;
      else displayedData = "timestamp:\""+date + "\"," + data;

      this.setState({
        receivedData: receivedData,
        displayedData: displayedData
      });

      this.autoScrollConsole();
    });
  }

  toggleDisplayData() {
    this.setState({ displayData: !this.state.displayData });
  }

  toggle() {
    ipcRenderer.send("listSerialPorts");
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleBauds() {
    this.setState({
      dropdownBaudsOpen: !this.state.dropdownBaudsOpen
    });
  }

  onClickOption(index, portName) {
    console.log("Selected SerialPort", index, portName);
    var portNameSimple = portName;
    if (portName.startsWith("/dev/tty.")) {
      portNameSimple = portName.replace("/dev/tty.", "");
    }
    this.setState({
      portName: portName,
      selected: index,
      portNameSimple: portNameSimple
    });
  }

  onClickOptionBauds(baudrate) {
    this.setState({ baud: baudrate });
  }

  onClickConnectSerial() {
    let { portName, baud } = this.state;
    ipcRenderer.send("serialport-open", portName, baud);
  }

  onClickCloseSerial() {
    ipcRenderer.send("serialport-close");
  }

  onClickClearConsole() {
    this.setState({ receivedData: [] });
  }

  autoScrollConsole() {
    var console = ReactDOM.findDOMNode(this.refs.serialConsole);
    console.scrollTop = console.scrollHeight;
  }

  getPortName() {
    return this.state.text;
  }

  alertOptions = {
    offset: 14,
    position: "bottom left",
    theme: "dark",
    time: 5000,
    transition: "scale"
  };

  showAlert(msg, type) {
    this.msg.show(msg, {
      time: 2000,
      type: type ? type : "success"
    });
  }

  render() {
    const {
      text,
      portName,
      portNameSimple,
      baud,
      open,
      receivedData,
      displayedData
    } = this.state;
    const { serial, onSelect } = this.props;

    let listPorts = [];
    if (serial)
      listPorts = serial.map((i, index) => (
        <DropdownItem key={i} onClick={() => this.onClickOption(index, i)}>
          <p>{i}</p>
        </DropdownItem>
      ));
    //creating list of baudrates
    let listBauds = this.bauds.map(i => (
      <DropdownItem
        key={"bauds_" + i}
        onClick={() => this.onClickOptionBauds(i)}
      >
        <p>{i.toString()}</p>
      </DropdownItem>
    ));

    var configSerialMenu = (
      <InputGroup>
        <InputGroupButton>
          <Dropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
            className="rounded-0"
          >
            <DropdownToggle caret>Port</DropdownToggle>
            <DropdownMenu>{listPorts}</DropdownMenu>
          </Dropdown>
        </InputGroupButton>
        <Input placeholder={portNameSimple} />
        <InputGroupButton>
          <Dropdown
            isOpen={this.state.dropdownBaudsOpen}
            toggle={this.toggleBauds}
            className="rounded-0"
          >
            <DropdownToggle caret>{baud ? baud : "bauds"}</DropdownToggle>
            <DropdownMenu className="rounded-0">{listBauds}</DropdownMenu>
          </Dropdown>
        </InputGroupButton>
        <InputGroupButton>
          <Button
            color={portName && baud ? "primary" : "secondary"}
            onClick={this.onClickConnectSerial}
          >
            connect
          </Button>
        </InputGroupButton>
      </InputGroup>
    );
    if (open) {
      configSerialMenu = (
        <Button onClick={this.onClickCloseSerial}>Close Connection</Button>
      );
    }
    return (
      <div>
        <div className="panel-label">SerialPort Configuration</div>
        {configSerialMenu}
        <div className="panel-item">
          <div className="panel-label">Connection Console</div>
          <div className="panel-item">
            <InputGroup>
              <InputGroupAddon>
                <input
                  addon
                  type="checkbox"
                  aria-label="display data from input"
                  onChange = {this.toggleDisplayData}
                />Display data (slow!)
              </InputGroupAddon>
              <InputGroupButton>
                <Button onClick={this.onClickClearConsole}>Clear</Button>
              </InputGroupButton>
            </InputGroup>

            <div className="serial-console" ref="serialConsole">
              {displayedData}
            </div>
          </div>
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
      </div>
    );
  }
}
