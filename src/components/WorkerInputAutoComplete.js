import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AutoComplete from 'material-ui/AutoComplete';
import WorkerMenuItem from './WorkerMenuItem';

class WorkerInputAutoComplete extends Component {
	onUpdateInput = (search) => {
		this.props.relay.setVariables({search});
	}
	onNewRequest = (select, index) => {
		this.props.onSelect(this.props.viewer.workers.edges[index].node);
	}
	render() {
		const dataSource = this.props.viewer.workers.edges.map(({node}, index) =>
				({text: node.email, value: <WorkerMenuItem index={index} worker={node}/>}));

		return (
	    <AutoComplete hintText='enter worker email' floatingLabelText='Select Worker'
	      dataSource={dataSource} onUpdateInput={this.onUpdateInput} onNewRequest={this.onNewRequest}/>
		);
	}
}

WorkerInputAutoComplete.propTypes = {
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(WorkerInputAutoComplete, {
	initialVariables: {
		search: null
	},
	prepareVariables: (variables) => {
		return variables;
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				workers(search:$search,first:5) {
					edges {
						node {
							id
							email
							${WorkerMenuItem.getFragment('worker')}
						}
					}
				}
			}
		`
	}
});