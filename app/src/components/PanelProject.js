import React, { Component } from "react";
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
import Dropzone from "react-dropzone";

import TreeView from "react-treeview";
import {} from "react-treeview/react-treeview.css";
import { Classes, ITreeNode, Tooltip, Tree } from "@blueprintjs/core";

//redux
import { connect } from "react-redux";
import {
  viewRightMenu,
  toggleRightMenu,
  toggleRecordMenu,
  toggleConsole
} from "../actions/menus";

import { getProject, setProject } from "../actions/project";


const electron = window.require("electron"); // little trick to import electron in react
const ipcRenderer = electron.ipcRenderer;
const { shell } = electron;



class PanelProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: null,
      filePath: null,
      fileSize: null,
      lastModifiedDate: null,
      projectEntryPoint: null
    };

    //let i = 0;
    //this.forEachNode(this.state.nodes, n => (n.id = i++));

    //this.clickSelectDirector = this.clickSelectDirector.bind(this);
    //this.readFile = this.readFile.bind(this);
    this.updateProject = this.updateProject.bind(this);

    //this.filesUpdated = this.filesUpdated.bind(this);
    this.openFolder = this.openFolder.bind(this);
    ipcRenderer.on("project-select-entry-return", (event, status, file) => {
      this.setState({ projectEntryPoint: file });
    });

    ipcRenderer.on("project-entry", this.updateProject);

    //ipcRenderer.on("file-update", this.filesUpdated);
  }

  updateProject(event, entry) {
    console.log("entry point", entry);
    var project = {entryPoint:entry};
    this.props.setProject(project);
    var nodes = [
      {
        iconName: "folder-close",
        isExpanded: true,
        label: entry.name,
        childNodes: [
          {
            iconName: "document",
            label: entry.indexed_files.main
          },
          {
            iconName: "pt-icon-folder-close",
            label: entry.indexed_files.shadersDirectory
          },
          {
            iconName: "pt-icon-folder-close",
            label: entry.indexed_files.modelsDirectory
          }
        ]
      }
    ];

    this.setState({
      name: entry.name,
      author: entry.author,
      indexed_files: entry.indexed_files,
      last_update: entry.last_update,
      directory: entry.directory,
      nodes: nodes
    });
    //this.setState({})
  }

  openFolder() {
    var filePath = this.state.directory;
    console.log("file path", filePath);
    shell.showItemInFolder(filePath);

  }

  /*
  filesUpdated(event, type, fileName, filePath, content) {
    console.log(fileName, filePath, content);
    if (type == "main") {
      try {
        eval(content);
        console.log("file updated");
      } catch (err) {
        console.log("error", err);
      }
    }
  }
*/
  clickSelectDirector() {
    this.refs.fileUploader.click();
  }

  readFile(event) {
    //ipcRenderer.send("project-select-entry", event);
  }

  render() {
    const { directory, author, name, indexed_files } = this.state;

    let dataSource = [];

    return (
      <div>
        <div className="panel-label">Project</div>
        <div className="panel-item">
          <p>
            Project Name:
            {name ? (
              <h3 className="file-name">{name}</h3>
            ) : (
              <h3>select a file (.json)</h3>
            )}
          </p>
          <p>
            {directory ? <div className="file-path">{directory}</div> : null}
          </p>

          <Button
            onClick={this.openFolder}
            className="btn"
            active={directory != null ? false : true}
          >
            Open Folder
          </Button>

          <Tree contents={this.state.nodes} />
        </div>
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
    setProject: project => dispatch(setProject(project)),
    toggleConsole: isOpen =>dispatch(toggleConsole())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelProject);