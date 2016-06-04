import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const WorkerListItem = ({worker, onClick}) => (
	<ListItem leftAvatar={<Avatar src={worker.avatarUrl}/>}
		primaryText={worker.email} secondaryText={worker.contact} onTouchTap={() => onClick(worker)}/>
);

export default Relay.createContainer(WorkerListItem, {
	fragments: {
		worker: () => Relay.QL`
			fragment on Worker {
				id
				email
				contact
				avatarUrl
			}
		`
	}
});