import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconNavBack from 'material-ui/svg-icons/navigation/arrow-back';
import { AddFloatButton } from './widgets';
import { OrderList, PaginationSearchTitle, OrderStatusDropdownMenu,
	OrderMultiSelectMenu, OrderDateRangeSelector, UserInputAutoComplete } from './components';
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
	onSelectStatus = (status) => {
		this.props.relay.setVariables({status});
	}
	onDataSelectChange = (after, before) => {
		this.props.relay.setVariables({afterDate: after, beforeDate: before});
	}
	onSelectUser = (user) => {
		this.props.relay.setVariables({userId: user.id});
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<Paper className='flex margin-bottom padding-horizontal'>
						<PaginationSearchTitle pageInfo={this.props.viewer.orders.pageInfo}
							first={first} after={after} last={last} before={before}
							onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					</Paper>
					<div className='flex flex-fill flex-row'>
						<div className='flex'>
							<Paper>
								<OrderDateRangeSelector onSelect={this.onDataSelectChange}/>
								<div className='padding-left'>
									<UserInputAutoComplete viewer={this.props.viewer}
										onSelect={this.onSelectUser}/>
								</div>
							</Paper>
							<Paper className='flex scroll margin-top'>
								<OrderMultiSelectMenu viewer={this.props.viewer}
									onSelect={this.onSelectStatus}/>
							</Paper>
						</div>
						<div className='flex flex-fill scroll margin-left' style={styles.fix}>
							<OrderList connection={this.props.viewer.orders}
								onItemClick={this.onItemClick}/>
						</div>
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
		right: 24,
		bottom: 24
	},
	fix: {
		padding: '0 2'
	}
};

const component = Relay.createContainer(OrderBrowserPage, {
	initialVariables: {
		userId: null,
		search: null,
		status: null,
		afterDate: null,
		beforeDate: null,
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
				orders(userId:$userId,status:$status,afterDate:$afterDate,beforeDate:$beforeDate,search:$search,first:$first,after:$after) @skip(if: $reverse) {
					${OrderList.getFragment('connection')}
					pageInfo {
					  hasNextPage
					  hasPreviousPage
					  endCursor
					  startCursor
					}
				}
				orders(userId:$userId,status:$status,afterDate:$afterDate,beforeDate:$beforeDate,search:$search,last:$last,before:$before) @include(if: $reverse) {
					${OrderList.getFragment('connection')}
					pageInfo {
					  hasNextPage
					  hasPreviousPage
					  endCursor
					  startCursor
					}
				}
				${OrderStatusDropdownMenu.getFragment('viewer')}
				${OrderMultiSelectMenu.getFragment('viewer')}
				${UserInputAutoComplete.getFragment('viewer')}
			}
		`
	}
});

export default {
	component,
	queries,
	prepareParams
};

