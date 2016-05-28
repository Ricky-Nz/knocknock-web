import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const AddressDropdownMenu = ({user, select, onSelect, ...props}) => (
	<SelectField {...props} floatingLabelText='Select Address' value={select} onChange={onSelect}>
		{
			user&&user.addresses.edges.map(({node}, index) =>
					<MenuItem key={index} value={node} primaryText={node.address} secondaryText={node.postalCode}/>)
		}
  </SelectField>
);

AddressDropdownMenu.propTypes = {
	select: PropTypes.object,
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(AddressDropdownMenu, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				addresses(first:100) {
					edges {
						node {
							id
							address
							postalCode
						}
					}
				}
			}
		`
	}
});