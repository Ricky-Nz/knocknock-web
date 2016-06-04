import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const UserListItem = ({user, onClick}) => (
	<ListItem leftAvatar={<Avatar src={user.avatarUrl}/>}
		primaryText={user.email} secondaryText={user.contact} onClick={() => onClick(user)}/>
);

export default Relay.createContainer(UserListItem, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				id
				email
				contact
				avatarUrl
			}
		`
	}
});