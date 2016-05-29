import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';
import IconOrder from 'material-ui/svg-icons/maps/local-offer';

const OrderListItem = ({order}) => (
	<Paper className='margin-bottom'>
		<ListItem leftAvatar={<Avatar src={order.userAvatar}/>} secondaryTextLines={2}
			primaryText={`${order.serialNumber} [${order.status}]`}
			secondaryText={
				<div>
					<div>{`Pickup address: ${order.pickupAddress}`}</div>
					<div>{`Pickup date: ${order.pickupDate} ${order.pickupTime}`}</div>
				</div>
			} rightToggle={<Checkbox/>}/>
	</Paper>
);

export default Relay.createContainer(OrderListItem, {
	fragments: {
		order: () => Relay.QL`
			fragment on Order {
        serialNumber
        userAvatar
        status
        pickupDate
        pickupTime
        pickupAddress
			}
		`
	}
});