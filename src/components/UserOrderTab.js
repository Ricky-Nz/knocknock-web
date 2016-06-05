import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import OrderList from './OrderList';
import PaginationSearchBar from './PaginationSearchBar';
import { AddFloatButton } from '../widgets';
import { paginationVariables } from '../utils';

class UserOrderTab extends Component {
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	onSelectOrder = (order) => {
		this.context.router.push(`/dashboard/order/${this.props.user.id}/${order.serialNumber}`)
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;
		
		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchBar pageInfo={this.props.user.orders.pageInfo}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<br/>
					<OrderList connection={this.props.user.orders} onAction={this.onSelectOrder}/>
				</div>
				<AddFloatButton className='page-float-button' onClick={this.props.onNewOrder}/>
			</div>
		);
	}
}

UserOrderTab.contextTypes = {
	router: PropTypes.object.isRequired
};

UserOrderTab.propTypes = {
	onNewOrder: PropTypes.func.isRequired
};

export default Relay.createContainer(UserOrderTab, {
	...paginationVariables(),
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				id
				orders(search:$search,first:$first,after:$after) @skip(if: $reverse) {
					${OrderList.getFragment('connection')}
					pageInfo {
					  hasNextPage
					  hasPreviousPage
					  endCursor
					  startCursor
					}
				}
				orders(search:$search,last:$last,before:$before) @include(if: $reverse) {
					${OrderList.getFragment('connection')}
					pageInfo {
					  hasNextPage
					  hasPreviousPage
					  endCursor
					  startCursor
					}
				}
			}
		`
	}
});