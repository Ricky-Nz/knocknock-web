import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

const ClothListItem = ({laundryCloth, onClick}) => (
	<Paper className='half-margin'>
		<ListItem leftAvatar={<Avatar src={laundryCloth.imageUrl}/>}
			primaryText={laundryCloth.nameEn} secondaryText={laundryCloth.nameCn} onClick={onClick}/>
	</Paper>
);

export default Relay.createContainer(ClothListItem, {
	fragments: {
		laundryCloth: () => Relay.QL`
			fragment on LaundryCloth {
				id
				nameCn
				nameEn
				imageUrl
			}
		`
	}
});