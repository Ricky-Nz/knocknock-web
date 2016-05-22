import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';
import { UpdateClothMutation, DeleteClothMutation } from '../mutations';

const ClothListItem = ({cloth, onClick, onDelete}) => (
	<Paper className='half-margin'>
		<ListItem leftAvatar={<Avatar src={cloth.imageUrl}/>}
			primaryText={cloth.nameEn} secondaryText={cloth.nameCn}
			rightIconButton={<IconButton onTouchTap={onDelete?(() => onDelete(cloth)):null}><IconDelete/></IconButton>}
			onTouchTap={onClick?(() => onClick(cloth)):null}/>
	</Paper>
);

export default Relay.createContainer(ClothListItem, {
	fragments: {
		cloth: () => Relay.QL`
			fragment on Cloth {
				${UpdateClothMutation.getFragment('cloth')}
				${DeleteClothMutation.getFragment('cloth')}
				id
				nameCn
				nameEn
				imageUrl
			}
		`
	}
});