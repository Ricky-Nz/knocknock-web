import React, { Component } from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

const FactoryMenuItem = ({factory}) => (
	<MenuItem primaryText={factory.name}	secondaryText={`${factory.contactName}: ${factory.contact}`}/>
);

export default Relay.createContainer(FactoryMenuItem, {
	fragments: {
		factory: () => Relay.QL`
			fragment on Factory {
				id
				name
				contact
				contactName
			}
		`
	}
});