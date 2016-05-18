import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { SearchBar } from './widgets';
import { UserList, PaginationBar } from './components';

class UserPanelComponent extends Component {
	onNavigate = (params) => {
		this.context.router.push({
			pathname: this.props.location.pathname,
			query: params
		});
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search: text});
	}
	render() {
		const { limit, cursor, reverse } = this.props.relay.variables;

		return (
			<div className='flex flex-fill'>
				<PaginationBar pageInfo={this.props.viewer.users.pageInfo}
					limit={limit} cursor={cursor} reverse={reverse} onNavigate={() => console.log(1)}/>
				<div className='flex flex-fill scroll padding'>
					<UserList users={this.props.viewer.users}/>
				</div>
			</div>
		);
	}
}

UserPanelComponent.contextTypes = {
	router: PropTypes.object
};

export const UserPanel = Relay.createContainer(UserPanelComponent, {
	initialVariables: {
		role: null,
		limit: 0,
		cursor: null,
		reverse: false,
		search: null
	},
	fragments: {
		users: () => Relay.QL`
			fragment on UserConnection {
				${UserList.getFragment('users')}
				pageInfo {
					${PaginationBar.getFragment('pageInfo')}
				}
			}
		`
	}
});
