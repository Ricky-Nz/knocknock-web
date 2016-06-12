import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconOrder from 'material-ui/svg-icons/maps/local-offer';
import IconChecked from 'material-ui/svg-icons/toggle/check-box';
import IconUnCheck from 'material-ui/svg-icons/toggle/check-box-outline-blank';

const OrderListItem = ({order, selectMode, select, onClick}) => (
	<ListItem leftAvatar={<Avatar src={order.userAvatar}/>} secondaryTextLines={2}
		primaryText={`${order.displayId} [${order.status.status}]`}
		secondaryText={
			<div>
				<div>{`Pickup address: ${order.pickupAddress}`}</div>
				<div>{`Pickup date: ${order.displayPickupDate} ${order.pickupTime}`}</div>
			</div>
		} rightIcon={selectMode?(select?<IconChecked/>:<IconUnCheck/>):null}
		onClick={() => onClick(order)}/>
);

OrderListItem.propTypes = {
	selectMode: PropTypes.bool,
	select: PropTypes.bool,
	onClick: PropTypes.func
};

export default Relay.createContainer(OrderListItem, {
	fragments: {
		order: () => Relay.QL`
			fragment on Order {
				id
				displayId
				userId
        userAvatar
        status {
        	status
        }
        pickupDate
        displayPickupDate
        pickupTime
        pickupAddress
			}
		`
	}
});