import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AutoComplete from 'material-ui/AutoComplete';
import UserMenuItem from './UserMenuItem';

class UserInputAutoComplete extends Component {
	onUpdateInput = (search) => {
		this.props.relay.setVariables({search});
	}
	onNewRequest = (select, index) => {
		this.props.onSelect(this.props.viewer.users.edges[index].node);
	}
	render() {
		const dataSource = this.props.viewer.users.edges.map(({node}, index) =>
				({text: node.email, value: <UserMenuItem index={index} user={node}/>}));

		return (
	    <AutoComplete hintText='enter user ID or email' floatingLabelText='Select User'
	      dataSource={dataSource} onUpdateInput={this.onUpdateInput} onNewRequest={this.onNewRequest}/>
		);
	}
}

UserInputAutoComplete.propTypes = {
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(UserInputAutoComplete, {
	initialVariables: {
		search: null
	},
	prepareVariables: (variables) => {
		return variables;
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				users(search:$search,first:5) {
					edges {
						node {
							id
							email
							${UserMenuItem.getFragment('user')}
						}
					}
				}
			}
		`
	}
});