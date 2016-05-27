import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconBuilding from 'material-ui/svg-icons/communication/business';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import { ListItem } from 'material-ui/List';

const AddressListItem = ({address, onAction}) => (
	<Paper className='margin-vertical'>
		<ListItem leftIcon={<IconBuilding/>}
			primaryText={`${address.address}, ${address.postalCode}`} secondaryText={`Tel: ${address.contact}`}
			rightIconButton={
			  <IconMenu onChange={(event, value) => onAction(address, value)}
			  	iconButtonElement={<IconButton touch={true}><IconMoreVert/></IconButton>}>
			    <MenuItem value='EDIT'>Edit</MenuItem>
			    <MenuItem value='DELETE'>Delete</MenuItem>
			  </IconMenu>
			}/>
	</Paper>
);

AddressListItem.propTypes = {
	onAction: PropTypes.func.isRequired
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