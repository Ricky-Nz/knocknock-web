import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { PaginationSearchBar, OrderList } from './components';
import { pageInfoFragment, paginationVariables } from './utils';

class HistoryOrderPage extends Component {
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	onSelectOrder = (order) => {
		this.context.router.push(`/dashboard/order/${order.userId}/${order.id}`);
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;

		return (
			<div className='flex flex-fill padding'>
				<PaginationSearchBar pageInfo={this.props.viewer.histories.pageInfo}
					first={first} after={after} last={last} before={before}
					onSearch={this.onSearch} onNavigate={this.onNavigate}/>
				<br/>
				<OrderList connection={this.props.viewer.histories}
					onSelect={this.onSelectOrder}/>
			</div>
		);
	}
}

HistoryOrderPage.contextTypes = {
	router: PropTypes.object.isRequired
};

export default Relay.createContainer(HistoryOrderPage, {
	...paginationVariables(),
	fragments: {
		viewer: (variables) => Relay.QL`
			fragment on Viewer {
				histories(search:$search,first:$first,after:$after) @skip(if: $reverse) {
					${OrderList.getFragment('connection')}
					pageInfo {
		        ${pageInfoFragment}
					}
				}
				histories(search:$search,last:$last,before:$before) @include(if: $reverse) {
					${OrderList.getFragment('connection')}
					pageInfo {
		        ${pageInfoFragment}
					}
				}
			}
		`
	}
});

