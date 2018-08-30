import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import PanelSerial from "./PanelSerial";
//import { Dropdown, Button } from "semantic-ui-react";
import icon_reload from '../assets/white_reload.svg';
import { Grid, Image } from 'semantic-ui-react';
import moment from 'moment';
import AlertContainer from 'react-alert';

import JsonViewer from './ui/JsonViewer';

import {} from '../styles/Menus.css';
import Dropdown from './ui/Dropdown';

import {
	InputGroup,
	InputGroupButton,
	InputGroupAddon,
	Input,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Button
} from 'reactstrap';

const electron = window.require('electron'); // little trick to import electron in react
const ipcRenderer = electron.ipcRenderer;

export default class RightMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			portName: null,
			baud: null,
			selected: null,
			dropdownOpen: false,
			dropdownBaudsOpen: false,
			open: false,
			receivedData: [],
			displayedData: [],
			displayData: false,
			receivedJson: null
		};
		this.onClickConnectSerial = this.onClickConnectSerial.bind(this);
		
    this.onChangePort = this.onChangePort.bind(this);
    this.onChangeBaud = this.onChangeBaud.bind(this);
    
    this.bauds = [110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 56000, 115200];

		ipcRenderer.on('serialport-error', (event, err) => {
			//log error here
			console.error('serial error', err);
			this.setState({ open: false });
		});

		ipcRenderer.on('serialport-isOpen', (event, isOpen) => {
			//console.log("Port is Open");

			if (isOpen) {
				this.showAlert('Serial Port Open');
			} else {
				this.showAlert('Serial Port Closed');
			}

			this.setState({ open: isOpen });
		});

		ipcRenderer.on('serialport-data', (event, data) => {
			//console.log("data received from Serial", data);
			var receivedJson = this.state.receivedJson;

			try {
				receivedJson = JSON.parse(data);
				this.setState({
					receivedJson: receivedJson
				});
			} catch (e) {
				receivedJson = { type: 'string' };
			}

			var displayedData = [];

			var date = moment().format('MM/DD/YYYY, hh:mm:ss');
			//receivedData.push('timestamp:"' + date + '",' + data);
			//receivedData.push('\r\n');

			//if (this.state.displayData) displayedData = receivedData;
			displayedData = 'timestamp:"' + date + '",' + data;

			this.setState({
				displayedData: displayedData
			});

			//this.autoScrollConsole();
		});
	}

	toggle() {
		ipcRenderer.send('listSerialPorts');
	}

	onChangePort(index, portName) {
		console.log('Selected SerialPort', index, portName);
		var portNameSimple = portName;
		if (portName.startsWith('/dev/tty.')) {
			portNameSimple = portName.replace('/dev/tty.', '');
		}
		this.setState({
			portName: portName,
			selected: index,
			portNameSimple: portNameSimple
		});
  }
  
  onChangeBaud(index, baudrate){
    this.setState({
			baud:parseInt(baudrate)
		});
  }

	onClickOptionBauds(baudrate) {
		this.setState({ baud: baudrate });
	}

	onClickConnectSerial() {
		let { portName, baud } = this.state;
		ipcRenderer.send('serialport-open', portName, baud);
	}

	onClickCloseSerial() {
		ipcRenderer.send('serialport-close');
	}

	getPortName() {
		return this.state.text;
	}

	alertOptions = {
		offset: 14,
		position: 'bottom left',
		theme: 'dark',
		time: 5000,
		transition: 'scale'
	};

	showAlert(msg, type) {
		this.msg.show(msg, {
			time: 2000,
			type: type ? type : 'success'
		});
	}

	render() {
		const { text, portName, portNameSimple, baud, open, receivedData, displayedData, receivedJson } = this.state;
		const { serial, onSelect } = this.props;

		var configSerialMenu = (
			<div className="serial-config">
				<div>
					<Dropdown placeHolder="Serial Port" label={portNameSimple} items={serial} onChange={this.onChangePort} />
				</div>
				<div>
					<Dropdown placeHolder="Baudrate" label={baud} items={this.bauds} onChange={this.onChangeBaud} />
				</div>
				<div>
					<button onClick={this.onClickConnectSerial}>Open Serial</button>
				</div>
			</div>
		);
		if (open) {
			configSerialMenu = <button onClick={this.onClickCloseSerial}>Close Serial: {portNameSimple}</button>;
		}

		return (
			<div>
				<div className="panel-label">SerialPort Configuration</div>
				{configSerialMenu}
				<div className="panel-item">
					<div className="panel-label">Received data schema</div>
					<div className="panel-item">
						<JsonViewer data={({SERIAL:receivedJson})} />
					</div>
				</div>
				<AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
			</div>
		);
	}
}
