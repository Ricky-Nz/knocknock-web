import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AutoComplete from 'material-ui/AutoComplete';
import FactoryMenuItem from './FactoryMenuItem';

class FactoryInputAutoComplete extends Component {
	onUpdateInput = (search) => {
		this.props.relay.setVariables({search});
	}
	onNewRequest = (select, index) => {
		this.props.onSelect(this.props.viewer.factories.edges[index].node);
	}
	render() {
		const dataSource = this.props.viewer.factories.edges.map(({node}, index) =>
				({text: node.name, value: <FactoryMenuItem index={index} factory={node}/>}));

		return (
	    <AutoComplete hintText='enter factory name' floatingLabelText='Factory'
	      dataSource={dataSource} onUpdateInput={this.onUpdateInput} onNewRequest={this.onNewRequest}/>
		);
	}
}

FactoryInputAutoComplete.propTypes = {
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(FactoryInputAutoComplete, {
	initialVariables: {
		search: null
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				factories(search:$search,first:5) {
					edges {
						node {
							id
							name
							${FactoryMenuItem.getFragment('factory')}
						}
					}
				}
			}
		`
	}
});