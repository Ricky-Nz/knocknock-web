import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import { UpdateClothMutation } from '../mutations';

const ClothListItem = ({cloth, onClick}) => (
	<Paper className='half-margin'>
		<ListItem leftAvatar={<Avatar src={cloth.imageUrl}/>}
			primaryText={cloth.nameEn} secondaryText={cloth.nameCn}
			onClick={onClick?(() => onClick(cloth)):null}/>
	</Paper>
);

export default Relay.createContainer(ClothListItem, {
	fragments: {
		cloth: () => Relay.QL`
			fragment on Cloth {
				${UpdateClothMutation.getFragment('cloth')}
				nameCn
				nameEn
				imageUrl
			}
		`
	}
});