import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const UserListItem = ({user, onClick}) => (
	<ListItem leftAvatar={<Avatar src={user.avatarUrl}/>}
		primaryText={user.name} secondaryText={user.contact} onClick={onClick}/>
);

export default Relay.createContainer(UserListItem, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				name
				contact
				avatarUrl
			}
		`
	}
});