import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconOrder from 'material-ui/svg-icons/maps/local-offer';
import IconChecked from 'material-ui/svg-icons/toggle/check-box';
import IconUnCheck from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import { OrderUpdateMutation } from '../mutations';

const OrderListItem = ({order, selectMode, select, onAction}) => (
	<ListItem leftAvatar={<Avatar src={order.userAvatar}/>} secondaryTextLines={2}
		primaryText={`${order.id} [${order.status.status}]`}
		secondaryText={
			<div>
				<div>{`Pickup address: ${order.pickupAddress}`}</div>
				<div>{`Pickup date: ${order.pickupDate} ${order.pickupTime}`}</div>
			</div>
		} rightIconButton={selectMode?
			<IconButton onTouchTap={onAction&&(() => onAction(order, 'SELECT'))}>
				{select?<IconChecked/>:<IconUnCheck/>}
			</IconButton>:null
		}
		onTouchTap={onAction&&(() => onAction(order, 'VIEW'))}/>
);

OrderListItem.propTypes = {
	selectMode: PropTypes.bool,
	select: PropTypes.bool,
	onAction: PropTypes.func
};

export default Relay.createContainer(OrderListItem, {
	fragments: {
		order: () => Relay.QL`
			fragment on Order {
				id
				userId
        userAvatar
        status {
        	status
        }
        pickupDate
        pickupTime
        pickupAddress
        ${OrderUpdateMutation.getFragment('order')}
			}
		`
	}
});