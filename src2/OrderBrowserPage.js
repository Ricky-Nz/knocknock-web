import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconNavBack from 'material-ui/svg-icons/navigation/arrow-back';
import { AddFloatButton } from './widgets';
import { OrderList, PaginationSearchTitle } from './components';
import { preparePageParams } from './utils';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

const prepareParams = (params, {location}) => {
	return {
		...preparePageParams(location)
	};
};

class OrderBrowserPage extends Component {
	onBack = () => {
		this.context.router.goBack();
	}
	onAddNew = () => {
		this.context.router.push({
			pathname: `/dashboard/order/new`
		});
	}
	onItemClick = (order) => {
		this.context.router.push({
			pathname: `/dashboard/order/${order.id}`
		});
	}
	onNavigate = (pagination) => {
		this.context.router.push({
			pathname: this.props.location.pathname,
			query: pagination
		});
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchTitle pageInfo={this.props.viewer.orders.pageInfo}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<div className='flex flex-fill scroll'>
						<OrderList connection={this.props.viewer.orders}
							onItemClick={this.onItemClick}/>
					</div>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAddNew}/>
			</div>
		);
	}
}

OrderBrowserPage.contextTypes = {
	router: PropTypes.object.isRequired
};

const styles = {
	floatButton: {
		position: 'absolute',
		right: 48,
		bottom: 48
	}
};

const component = Relay.createContainer(OrderBrowserPage, {
	initialVariables: {
		userId: null,
		search: null,
		first: 0,
		last: 0,
		after: null,
		before: null,
		reverse: false
	},
	prepareVariables: (variables) => {
		return {
			...variables,
			reverse: variables.last > 0
		}
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				orders(userId:$userId,search:$search,first:$first,after:$after) @skip(if: $reverse) {
					${OrderList.getFragment('connection')}
					pageInfo {
					  hasNextPage
					  hasPreviousPage
					  endCursor
					  startCursor
					}
				}
				orders(userId:$userId,search:$search,last:$last,before:$before) @include(if: $reverse) {
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

export default {
	component,
	queries,
	prepareParams
};

