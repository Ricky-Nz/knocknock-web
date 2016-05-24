import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AddressListItem from './AddressListItem';
import { List } from 'material-ui/List';

class AddressList extends Component {
	render() {
		return (
			<List>
				{
					this.props.connection.edges.map(({node}, index) =>
						<AddressListItem key={index} address={node}
							onAction={this.props.onAction}/>)
				}
			</List>
		);
	}
}

AddressList.propTypes = {
	onAction: PropTypes.func.isRequired
};

export default Relay.createContainer(AddressList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on AddressConnection {
				edges {
					node {
						${AddressListItem.getFragment('address')}
					}
				}
			}
		`
	}
});