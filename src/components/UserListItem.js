import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const UserListItem = ({user, onClick}) => (
	<ListItem leftAvatar={<Avatar src={user.avatarUrl}/>}
		primaryText={`${user.firstName||''} ${user.lastName||''}`}
		secondaryTextLines={2}
		secondaryText={
			<div>
				<div>{`Email: ${user.email||''}`}</div>
				<div>{`Tel: ${user.contact||''}`}</div>
			</div>
		} onTouchTap={() => onClick(user)}/>
);

export default Relay.createContainer(UserListItem, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				id
				email
				contact
				avatarUrl
				firstName
				lastName
			}
		`
	}
});