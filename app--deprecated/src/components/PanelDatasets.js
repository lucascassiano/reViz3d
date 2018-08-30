import React, { Component } from 'react';
import { setProjectName, setProject, getProject } from '../actions/project';
import { connect } from 'react-redux';
import JsonViewer from './ui/JsonViewer';

class PanelDatasets extends Component {
	constructor(props) {
		super(props);
	}

	render() {
        
        let datasets = {DATASETS: this.props.datasets};
        
		return (
			<div>
				<div className="panel-item">
					<div className="panel-label">Received data schema</div>
					<div className="panel-item">
						<JsonViewer data={datasets} rootName="DATASETS" />
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
        datasets: state.project.datasets
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
export default connect(mapStateToProps, mapDispatchToProps)(PanelDatasets);
