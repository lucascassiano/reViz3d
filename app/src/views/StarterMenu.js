/* eslint no-eval: 0 */
import React, { Component } from 'react';
import '../styles/StarterMenu.css';
import logo from '../assets/reviz_logo_starter.svg';
import github from '../assets/reviz_github.svg';

const electron = window.require('electron'); // little trick to import electron in react
const ipcRenderer = electron.ipcRenderer;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animate: false,
			visible: true
		};

		this.hide = this.hide.bind(this);
		this.animate = this.animate.bind(this);

		this.newFile = this.newFile.bind(this);
        this.openFile = this.openFile.bind(this);

        ipcRenderer.on("new-project",()=>{
            this.animate();
        });
    }
    
	animate = () => {
		this.setState({
			animate: true
		});
        this.hide();
		//setInterval(this.hide, 1000);
	}

	hide() {
		this.setState({
			visible: false
		});
	}

    //*internal calls
    
	newFile() {
		ipcRenderer.send('new-project');
	}

	openFile() {
		ipcRenderer.send('open-project');
	}

	render() {
		var _class = 'starter-menu';
		if (this.state.animate) {
			_class += ' starter-menu-off';
		}

		if (this.state.visible == false) {
			_class += ' starter-gone';
		}

		return (
			<div className={_class}>
				<div className="starter-menu-bg" />
				<div className="sidebar">
					<img src={logo} className="logo" />
					<div className="version">version 1.0 - beta</div>
					<div className="user-menu" />
					<ul>
						<li onClick={this.newFile}>New Project</li>
						<li>Open Project</li>
						<li>Tutorials</li>
						<li>Users</li>
						<li>Developers</li>
					</ul>

					<img src={github} className="logo-bottom" />
				</div>
			</div>
		);
	}
}

export default App;
