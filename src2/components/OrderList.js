import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import OrderListItem from './OrderListItem';

const OrderList = ({connection}) => (
	<List>
		{
			connection.edges.map(({node}, index) =>
				<OrderListItem key={index} order={node}/>)
		}
	</List>
);

export default Relay.createContainer(OrderList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on OrderConnection {
				edges {
					node {
						${OrderListItem.getFragment('order')}
					}
				}
			}
		`
	}
})