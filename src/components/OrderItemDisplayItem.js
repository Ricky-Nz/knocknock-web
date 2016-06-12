import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

const OrderItemDisplayItem = ({item}) => (
	<ListItem leftAvatar={<Avatar src={item.cloth&&item.cloth.imageUrl}/>}
		primaryText={item.cloth&&`${item.cloth.nameEn} (${item.cloth.nameCn}) [${item.washType}]`}
		secondaryTextLines={2} secondaryText={
			<div>
				<div>{`Quantity: ${item.quantity}`}</div>
				<div>{`Price: S$${item.price}`}</div>
			</div>
		}/>
);

export default Relay.createContainer(OrderItemDisplayItem, {
	fragments: {
		item: () => Relay.QL`
			fragment on OrderItem {
				washType
				quantity
				price
				cloth {
					imageUrl
					nameCn
					nameEn
				}
			}
		`
	}
});