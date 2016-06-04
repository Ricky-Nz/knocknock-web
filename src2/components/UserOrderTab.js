import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import OrderList from './OrderList';
import PaginationSearchBar from './PaginationSearchBar';
import { AddFloatButton } from '../widgets';
import { paginationVariables } from '../utils';

class UserOrderTab extends Component {
	onAdd = () => {
		this.context.router.push(`/dashboard/order/new/${this.props.user.id}`);
	}
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
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
					<OrderList connection={this.props.user.orders} onAction={this.onOrderAction}/>
				</div>
				<AddFloatButton className='page-float-button' onClick={this.onAdd}/>
			</div>
		);
	}
}

UserOrderTab.contextTypes = {
	router: PropTypes.object.isRequired
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