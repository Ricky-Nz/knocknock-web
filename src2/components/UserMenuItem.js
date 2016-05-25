import React, { Component } from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

const UserMenuItem = ({user}) => (
	<MenuItem leftIcon={<Avatar src={user.avatarUrl}/>}
		primaryText={user.email}/>
);

export default Relay.createContainer(UserMenuItem, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				id
				email
				avatarUrl
			}
		`
	}
});