import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';

const FactoryListItem = ({factory, onAction}) => (
	<Paper className='margin-vertical'>
		<ListItem
			primaryText={factory.name}
			secondaryText={`${factory.address}, ${factory.postalCode}. ${factory.contactName} ${factory.contact}`}
			rightIconButton={
			  <IconMenu onChange={(event, value) => onAction(factory, value)}
			  	iconButtonElement={<IconButton touch={true}><IconMoreVert/></IconButton>}>
			  	<MenuItem value='EDIT'>Edit</MenuItem>
			    <MenuItem value='DELETE'>Delete</MenuItem>
			  </IconMenu>
			}/>
	</Paper>
);

FactoryListItem.propTypes = {
	onAction: PropTypes.func.isRequired
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