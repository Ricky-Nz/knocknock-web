import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import SelectField from 'material-ui/SelectField';
import AddressMenuItem from './AddressMenuItem';

class AddressDropdownMenu extends Component {
	render() {
		return (
			<SelectField floatingLabelText='Select Address' value={this.props.selectAddress&&this.props.selectAddress.id} onChange={this.handleChange}>
				{
					this.props.user.addresses.edges.map(({node}, index) =>
							<AddressMenuItem index={index} address={node}/>)
				}
      </SelectField>
		);
	}
}

AddressDropdownMenu.propTypes = {
	selectAddress: PropTypes.object
};

export default Relay.createContainer(AddressDropdownMenu, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				addresses(first:100) {
					edges {
						node {
							id
							${AddressMenuItem.getFragment('address')}
						}
					}
				}
			}
		`
	}
});