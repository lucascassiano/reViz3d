import React, { Component } from "react";
import Toolbar from "react-minimalist-toolbar";
import {} from "../styles/Menus.css";

import Loader from "react-loaders";

import {} from "loaders.css";

import { Button, Classes, Dialog, Tooltip, Slider } from "@blueprintjs/core";

//redux
import { connect } from "react-redux";
import {
  viewRightMenu,
  toggleRightMenu,
  toggleRecordMenu
} from "../actions/menus";
import { getProject, setProject } from "../actions/project";
const electron = window.require("electron"); // little trick to import electron in react
const ipcRenderer = electron.ipcRenderer;

class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.toggleRightMenu = this.toggleRightMenu.bind(this);
    this.toggleRecordMenu = this.toggleRecordMenu.bind(this);
    this.newFile = this.newFile.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.openFile = this.openFile.bind(this);
    this.exportReactComponent = this.exportReactComponent.bind(this);
    this.exportImage = this.exportImage.bind(this);
    this.closeLoadingMenu = this.closeLoadingMenu.bind(this);
    this.toggleLoadingMenu = this.toggleLoadingMenu.bind(this);

    this.state = {
      isLoading: false
    };

    ipcRenderer.on("export-react-component-loaded", this.toggleLoadingMenu);
    ipcRenderer.on("error", this.closeLoadingMenu);
  }

  toggleRightMenu() {
    this.props.toggleRightMenu();
  }

  toggleRecordMenu() {
    this.props.toggleRecordMenu();
  }

  newFile() {
    ipcRenderer.send("new-project");
  }

  saveFile() {
    ipcRenderer.send("save-project", this.props.project);
  }

  openFile() {
    ipcRenderer.send("open-project");
  }

  exportReactComponent() {
    this.toggleLoadingMenu();
    ipcRenderer.send("export-react-component");
  }

  exportImage() {
    ipcRenderer.send("export-image", "image info here");
  }

  toggleLoadingMenu() {
    this.setState({ isLoading: !this.state.isLoading });
  }

  closeLoadingMenu() {
    this.setState({ isLoading: false });
  }

  render() {
    this.menu = [
      {
        text: "Project",
        items: [
          {
            text: "New",
            callback: this.newFile
          },
          {
            text: "Open",
            callback: this.openFile
          },
          {
            text: "Save",
            callback: this.saveFile
          }
        ]
      },
      {
        text: "View",
        items: [
          {
            text: this.props.rightMenu_isOpen
              ? "hide Inspector menu"
              : "Inspector Menu",
            callback: this.toggleRightMenu
          },
          {
            text: this.props.recordMenu_isOpen
              ? "hide Record menu"
              : "Record Menu",
            callback: this.toggleRecordMenu
          }
        ]
      },
      {
        text: "Export",
        items: [
          {
            text: "React Component",
            callback: this.exportReactComponent
          },
          {
            text: "Image",
            callback: this.exportImage
          }
        ]
      }
    ];

    return (
      <div className="top-menu">
        <Toolbar menu={this.menu} url={"http://github.com/lucascassiano"} />
        <Dialog title="Export React Component" isOpen={this.state.isLoading}>
          <Loader type="ball-grid-pulse" className="loader" />
          <div className="dialog-content">
            Converting the project into a React Component
          </div>
          <div className="dialog-footer">
            <div style={{ color: "#aaa", fontSize: 10 }}>
              this might take up to a minute
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.rightMenu_isOpen
    project: state.project,
    rightMenu_isOpen: state.menus.rightMenu_isOpen,
    recordMenu_isOpen: state.menus.recordMenu_isOpen
  };
};

// Maps actions to props
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // You can now say this.props.viewRightMenu
    viewRightMenu: isOpen => dispatch(viewRightMenu(isOpen)),
    toggleRightMenu: isOpen => dispatch(toggleRightMenu()),
    toggleRecordMenu: () => dispatch(toggleRecordMenu()),
    getProject: () => dispatch(getProject()),
    setProject: project => dispatch(setProject(project))
  };
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
