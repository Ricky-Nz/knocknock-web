import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import IconBuilding from 'material-ui/svg-icons/communication/business';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';
import { ListItem } from 'material-ui/List';

const AddressListItem = ({address, onClick}) => (
	<ListItem leftIcon={<IconBuilding/>} onTouchTap={() => onClick(address)}
		primaryText={address.address} secondaryTextLines={2}
		secondaryText={
			<div>
				<div>{`Postal Code: ${address.postalCode||'n/a'}`}</div>
				<div>{`Tel: ${address.contact||'n/a'}`}</div>
			</div>
		} rightIcon={<IconEditor/>}/>
);

AddressListItem.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default Relay.createContainer(AddressListItem, {
	fragments: {
		address: () => Relay.QL`
			fragment on Address {
				id
				postalCode
				address
				contact
			}
		`
	}
});