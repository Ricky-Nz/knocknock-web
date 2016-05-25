import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import IconOrder from 'material-ui/svg-icons/maps/local-grocery-store';

const OrderListItem = ({order}) => (
	<Paper className='margin-vertical'>
		<ListItem leftIcon={<IconOrder/>}
			primaryText={order.id} secondaryText={order.status}/>
	</Paper>
);

export default Relay.createContainer(OrderListItem, {
	fragments: {
		order: () => Relay.QL`
			fragment on Order {
        id
        status
			}
		`
	}
});