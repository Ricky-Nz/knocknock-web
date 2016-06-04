import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import { AdminUpdateMutation } from '../mutations';

const FactoryListItem = ({admin, onClick}) => (
	<ListItem primaryText={admin.name}
		secondaryText={`${admin.email}, ${admin.contact}`}
		rightIcon={<IconEdit/>} onTouchTap={() => onClick(admin)}/>
);

FactoryListItem.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default Relay.createContainer(FactoryListItem, {
	fragments: {
		admin: () => Relay.QL`
			fragment on Admin {
				id
				email
				name
				contact
				${AdminUpdateMutation.getFragment('admin')}
			}
		`
	}
});