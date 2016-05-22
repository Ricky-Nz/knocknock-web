import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import IconFolder from 'material-ui/svg-icons/file/folder';
import IconDelete from 'material-ui/svg-icons/action/delete';

const ClothCategoryListItem = ({category, onClick, onDelete}) => (
	<Paper className='margin-vertical'>
		<ListItem leftIcon={<IconFolder/>}
			primaryText={category.nameEn} secondaryText={category.nameCn}
			rightIconButton={<IconButton onTouchTap={onDelete?(() => onDelete(category)):null}><IconDelete/></IconButton>}
			onTouchTap={onClick?(() => onClick(category)):null}/>
	</Paper>
);

export default Relay.createContainer(ClothCategoryListItem, {
	fragments: {
		category: () => Relay.QL`
			fragment on ClothCategory {
				id
				nameCn
				nameEn
				count
			}
		`
	}
});