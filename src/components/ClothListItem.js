import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';

const ClothListItem = ({cloth, onClick}) => (
	<ListItem leftAvatar={<Avatar src={cloth.imageUrl}/>}
		primaryText={`${cloth.nameEn} (${cloth.nameCn})`}
		secondaryText={`Wash: $${cloth.washPrice}, Iron: $${cloth.ironPrice}, Dry: $${cloth.dryCleanPrice}`}
		rightIcon={<IconEditor/>} onClick={() => onClick(cloth)}/>	
);

ClothListItem.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default Relay.createContainer(ClothListItem, {
	fragments: {
		cloth: () => Relay.QL`
			fragment on Cloth {
				id
				nameCn
				nameEn
				imageUrl
				washPrice
				ironPrice
				dryCleanPrice
				washPriceDiscount
			}
		`
	}
});