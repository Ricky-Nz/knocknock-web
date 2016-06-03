import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const OrderStatusDropdownMenu = ({viewer, select, onSelect, disabled}) => (
	<SelectField floatingLabelText='Select Order Status' disabled={disabled} value={select} onChange={onSelect}>
		{
			viewer.orderStatus.map((status, index) =>
					<MenuItem key={index} value={status} primaryText={status}/>)
		}
  </SelectField>
);

OrderStatusDropdownMenu.propTypes = {
	select: PropTypes.string,
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(OrderStatusDropdownMenu, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				orderStatus
			}
		`
	}
});