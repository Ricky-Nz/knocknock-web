import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

const UserListItem = ({user, onClick}) => (
	<Paper style={styles.container}>
		<ListItem leftAvatar={<Avatar src={user.avatarUrl}/>}
			primaryText={user.email} secondaryText={user.contact} onClick={() => onClick(user)}/>
	</Paper>
);

const styles = {
	container: {
		margin: 8
	}
};

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