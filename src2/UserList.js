import React, { Component } from 'react';
import Relay from 'react-relay';
import UserListItem from './UserListItem';

class UserListComponent extends Component {
	render() {
		return (
			<div>
				{
					this.props.users.edges.map(({node}, index) =>
						<UserListItem key={index} user={node}/>)
				}
			</div>
		);
	}
}

export const UserList = Relay.createContainer(UserListComponent, {
	fragments: {
		users: () => Relay.QL`
			fragment on UserConnection {
				edges {
					node {
						${UserListItem.getFragment('user')}
					}
				}
			}
		`
	}
});

export const UserListQuery = {
	users: () => Relay.QL`
		query { users(token: "SS") }
	`
};