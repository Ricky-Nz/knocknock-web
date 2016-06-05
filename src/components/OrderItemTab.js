import React, { Component } from 'react';
import Relay from 'react-relay';
import OrderItemListItem from './OrderItemListItem';

class OrderItemTab extends Component {
	onUpdateOrderItem = () => {

	}
	render() {
		return (
			<div className='scroll padding'>
				{
					this.props.order.orderItems.edges.map(({node}, index) =>
						<OrderItemListItem key={index} index={index} itemImageUrl={node.itemImageUrl}
							itemNameCn={node.itemNameCn} itemNameEn={node.itemNameEn} quantity={node.quantity}
							washType={node.washType} disabled={true} onAction={this.onUpdateOrderItem}/>)
				}
			</div>
		);
	}
}

export default Relay.createContainer(OrderItemTab, {
	fragments: {
		order: () => Relay.QL`
			fragment on Order {
				orderItems(first: 1000) {
					edges {
						node {
							id
							washType
							quantity
							itemPrice
							itemNameCn
							itemNameEn
							itemImageUrl
						}
					}
				}
			}
		`
	}
});