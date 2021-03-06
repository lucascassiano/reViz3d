import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleRecordMenu } from '../actions/menus';
import Toggle from './ui/Toggle';
import InputText from './ui/InputText';
import sendMsg_icon from '../assets/send_message.svg';
import JsonViewer from './ui/JsonViewer';

const electron = window.require('electron'); // little trick to import electron in react
const ipcRenderer = electron.ipcRenderer;

class PanelMQTT extends Component {
	constructor(props) {
		super(props);
		this.state = {
			connected: false,
			url: null,
			topic: null,
			outTopic: null,
			message: null,
			receivedMsg: null
		};

		ipcRenderer.on('mqtt-connected', (event, isConnected) => {
			console.log('mqtt-connected', isConnected);
		});

		ipcRenderer.on('mqtt-message', (event, topic, message) => {
			console.log('mqtt-message', topic, message);
			this.onReceiveMessage(topic, message);
		});

		this.Subscribe = this.Subscribe.bind(this);
		this.publishMessage = this.publishMessage.bind(this);
		this.onReceiveMessage = this.onReceiveMessage.bind(this);

		this.changeUrl = this.changeUrl.bind(this);
		this.changeTopic = this.changeTopic.bind(this);
		this.changeOutTopic = this.changeOutTopic.bind(this);
		this.changeMessage = this.changeMessage.bind(this);
	}

	changeUrl(event) {
		this.setState({
			url: event.target.value
		});
		//alert('A name was submitted: ' + this.input.value);
		//event.preventDefault();
	}

	changeTopic(event) {
		this.setState({
			topic: event.target.value
		});
	}

	changeOutTopic(event) {
		this.setState({
			outTopic: event.target.value
		});
	}

	changeMessage(event) {
		this.setState({
			message: event.target.value
		});
	}

	publishMessage() {
		var { outTopic, message } = this.state;
		ipcRenderer.send('mqtt-publish', outTopic, message);
	}

	Subscribe() {
		var { url, topic } = this.state;
		ipcRenderer.send('mqtt-subscribe', url, topic);
	}

	onReceiveMessage(topic, message) {
		this.setState({
			receivedMsg: message.toString()
		});
	}

	render() {
		var { receivedMsg } = this.state;

		return (
			<div>
        <div className="panel-label">MQTT | URL Configuration</div>
        <div className="mqtt-config">
          <input type="text" placeholder="mqtt://mqttserver" onChange={this.changeUrl} />
          <input type="text" placeholder="topic" onChange={this.changeTopic} />
          <button onClick={this.Subscribe}>Subscribe</button>
        </div>
        <div className="panel-label">Send Messages to MQTT on Topic</div>
        <div className="mqtt-config">
        <input  placeholder="outTopic" onChange={this.changeOutTopic} />
				<input  placeholder="message" onChange={this.changeMessage} />
				<button onClick={this.publishMessage}>
					publish<img src={sendMsg_icon} />
				</button>

        </div>
		
				<div className="panel-item">
					<div className="panel-label">Received data schema</div>
					<div className="panel-item">
						<JsonViewer data={({MQTT:receivedMsg})} />
					</div>
				</div>
			</div>
		);
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
