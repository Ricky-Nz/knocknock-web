import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import AddressListItem from './AddressListItem';
import { List } from 'material-ui/List';

class AddressList extends Component {
	render() {
		return (
			<List>
				{
					this.props.connection.edges.map(({node}, index) =>
						<Paper key={index} className='margin-bottom'>
							<AddressListItem address={node} onClick={this.props.onSelect}/>
						</Paper>
					)
				}
			</List>
		);
	}
}

AddressList.propTypes = {
	onSelect: PropTypes.func.isRequired
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