import React, { Component } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import UserListItem from './UserListItem';

class UserList extends Component {
	render() {
		return (
			<List>
				{
					this.props.users.edges.map(({node}, index) =>
						<UserListItem key={index} user={node}/>)
				}
			</List>
		);
	}
}

export default Relay.createContainer(UserList, {
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