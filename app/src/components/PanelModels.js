import React, { Component } from "react";
import { setProjectName, setProject, getProject } from "../actions/project";
import { connect } from "react-redux";
var sizeof = require('object-sizeof');

class PanelModels extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("props model menu", this.props);
    return (
      <div>
        <p>3d models in the project</p>
        <p>{Object.keys(this.props.models.obj).length}</p>
      </div>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    project: state.project,
    name: state.project.name,
    models: state.project.models
  };
};

// Maps actions to props
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // You can now say this.props.viewRightMenu
    setProject: project => dispatch(setProject(project)),
    setProjectName: name => dispatch(setProjectName(name))
  };
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(PanelModels);
