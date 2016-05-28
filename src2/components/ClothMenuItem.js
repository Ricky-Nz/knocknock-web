import React, { Component } from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

const ClothMenuItem = ({cloth}) => (
	<MenuItem leftIcon={<Avatar src={cloth.imageUrl}/>}
		primaryText={cloth.nameEn} secondaryText={cloth.nameCn}/>
);

export default Relay.createContainer(ClothMenuItem, {
	fragments: {
		cloth: () => Relay.QL`
			fragment on Cloth {
				id
				nameCn
				nameEn
				imageUrl
			}
		`
	}
});