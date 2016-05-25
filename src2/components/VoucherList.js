import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import VoucherListItem from './VoucherListItem';

const VoucherList = ({connection}) => (
	<List>
		{
			connection.edges.map(({node}, index) =>
				<VoucherListItem key={index} voucher={node}/>)
		}
	</List>
);

export default Relay.createContainer(VoucherList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on VoucherConnection {
				edges {
					node {
						${VoucherListItem.getFragment('voucher')}
					}
				}
			}
		`
	}
})