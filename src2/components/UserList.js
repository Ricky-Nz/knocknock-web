import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import UserListItem from './UserListItem';

const UserList = ({connection, onItemClick}) => (
	<List>
		{
			connection.edges.map(({node}, index) =>
				<UserListItem key={index} user={node}
					onClick={onItemClick}/>)
		}
	</List>
);

UserList.propTypes = {
	onItemClick: PropTypes.func.isRequired
};

export default Relay.createContainer(UserList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on UserConnection {
				edges {
					node {
						${UserListItem.getFragment('user')}
					}
				}
			}
		`
	}
})