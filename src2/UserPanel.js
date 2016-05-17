import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { UserList } from './components';

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
		console.log(this.props.viewer.users);
		return (
			<div className='flex flex-fill'>

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
		viewer: () => Relay.QL`
			fragment on Viewer {
				users(role: $role, search: $search, first: $limit, after: $cursor) @skip(if: $reverse) {
					${UserList.getFragment('users')}
					pageInfo {
						startCursor
		        endCursor
		        hasNextPage
		        hasPreviousPage
					}
				}
				users(role: $role, search: $search, last: $limit, before: $cursor) @include(if: $reverse) {
					${UserList.getFragment('users')}
					pageInfo {
						startCursor
		        endCursor
		        hasNextPage
		        hasPreviousPage
					}
				}
			}
		`
	}
});
