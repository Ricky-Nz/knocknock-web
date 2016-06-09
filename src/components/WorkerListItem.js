import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const WorkerListItem = ({worker, onClick}) => (
	<ListItem leftAvatar={<Avatar src={worker.avatarUrl}/>}
		primaryText={`${worker.firstName||''} ${worker.lastName}||''`}
		secondaryTextLines={2}
		secondaryText={
			<div>
				<div>{`Email: ${worker.email||''}`}</div>
				<div>{`Tel: ${worker.contact||''}`}</div>
			</div>
		} onTouchTap={() => onClick(worker)}/>
);

export default Relay.createContainer(WorkerListItem, {
	fragments: {
		worker: () => Relay.QL`
			fragment on Worker {
				id
				email
				contact
				firstName
				lastName
				avatarUrl
			}
		`
	}
});