import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';

const FactoryListItem = ({factory, onClick}) => (
	<ListItem primaryText={factory.name}
		secondaryText={`${factory.address}, ${factory.postalCode}. ${factory.contactName} ${factory.contact}`}
		rightIcon={<IconEdit/>} onClick={() => onClick(factory)}/>
);

FactoryListItem.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default Relay.createContainer(FactoryListItem, {
	fragments: {
		factory: () => Relay.QL`
			fragment on Factory {
				id
				name
				address
				postalCode
				contact
				contactName
			}
		`
	}
});