import React, { Component } from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';

const AddressMenuItem = ({address}) => (
	<MenuItem value={address.id} primaryText={address.address} secondaryText={address.postalCode}/>
);

export default Relay.createContainer(AddressMenuItem, {
	fragments: {
		address: () => Relay.QL`
			fragment on Address {
				id
				address
				postalCode
			}
		`
	}
});