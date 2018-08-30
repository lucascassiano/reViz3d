import React, { Component } from "react";
import { setProjectName, setProject } from "../actions/project";
import { connect } from "react-redux";
import JsonViewer from './ui/JsonViewer';

class PanelModels extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let models = {MODELS: this.props.models};
  
    return (
			<div>
				<div className="panel-item">
					<div className="panel-label">Loaded .OBJ Models</div>
					<div className="panel-item">
						<JsonViewer data={models}/>
					</div>
				</div>
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
