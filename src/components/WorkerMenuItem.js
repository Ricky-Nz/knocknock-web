import React, { Component } from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

const WorkerMenuItem = ({worker}) => (
	<MenuItem leftIcon={<Avatar src={worker.avatarUrl}/>}
		primaryText={worker.email}/>
);

export default Relay.createContainer(WorkerMenuItem, {
	fragments: {
		worker: () => Relay.QL`
			fragment on Worker {
				id
				email
				avatarUrl
			}
		`
	}
});