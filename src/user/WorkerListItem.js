import React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const WorkerListItem = ({name, contact, avatarUrl, onClick}) => (
	<ListItem leftAvatar={<Avatar src={avatarUrl}/>}
		primaryText={name} secondaryText={contact} onClick={onClick}/>
);

export default WorkerListItem;