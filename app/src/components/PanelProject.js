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

const electron = window.require("electron"); // little trick to import electron in react
const ipcRenderer = electron.ipcRenderer;
const { shell } = electron;

export default class PanelProject extends Component {
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
