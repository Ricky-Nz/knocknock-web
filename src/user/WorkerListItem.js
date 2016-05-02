import React from 'react';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

const WorkerListItem = ({name, contact, avatarUrl, onClick}) => (
	<Paper className='margin'>
		<ListItem leftAvatar={<Avatar src={avatarUrl}/>}
			primaryText={name} secondaryText={contact} onClick={onClick}/>
	</Paper>
);

export default WorkerListItem;