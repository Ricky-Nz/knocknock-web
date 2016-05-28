import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

const WorkerListItem = ({worker, onClick}) => (
	<Paper className='margin'>
		<ListItem leftAvatar={<Avatar src={worker.avatarUrl}/>}
			primaryText={worker.email} secondaryText={worker.contact} onClick={() => onClick(worker)}/>
	</Paper>
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