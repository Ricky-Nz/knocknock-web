import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconOrder from 'material-ui/svg-icons/maps/local-offer';
import IconChecked from 'material-ui/svg-icons/toggle/check-box';
import IconUnCheck from 'material-ui/svg-icons/toggle/check-box-outline-blank';

const OrderListItem = ({order, selectMode, select, onAction}) => (
	<Paper className='margin-bottom' style={styles.fix}>
		<ListItem leftAvatar={<Avatar src={order.userAvatar}/>} secondaryTextLines={2}
			primaryText={`${order.serialNumber} [${order.status}]`}
			secondaryText={
				<div>
					<div>{`Pickup address: ${order.pickupAddress}`}</div>
					<div>{`Pickup date: ${order.pickupDate} ${order.pickupTime}`}</div>
				</div>
			} rightIconButton={selectMode?
				<IconButton onTouchTap={() => onAction(order, 'SELECT')}>
					{select?<IconChecked/>:<IconUnCheck/>}
				</IconButton>:null
			}
			onTouchTap={() => onAction(order, 'VIEW')}/>
	</Paper>
);

OrderListItem.propTypes = {
	selectMode: PropTypes.bool,
	select: PropTypes.bool,
	onAction: PropTypes.func.isRequired
};

const styles = {
	fix: {
		marginLeft: 2,
		marginRight: 2
	}
};

export default Relay.createContainer(OrderListItem, {
	fragments: {
		order: () => Relay.QL`
			fragment on Order {
				id
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