import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';
import { AddFloatButton } from './widgets';
import { OrderList, PaginationSearchTitle, OrderStatusDropdownMenu,
	OrderMultiSelectMenu, OrderDateRangeSelector, UserInputAutoComplete,
	OrderBulkUpdateDialog } from './components';
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
	state = {
		editDialogOpen: false,
		selectOrders: []
	}
	onBack = () => {
		this.context.router.goBack();
	}
	onOrderAction = (order, action) => {
		switch(action) {
			case 'VIEW':
				this.context.router.push(`/dashboard/order/${order.userId}/${order.serialNumber}`);
				break;
			case 'SELECT':
				const index = this.state.selectOrders.indexOf(order);
				if (index >= 0) {
					this.setState({selectOrders: [...this.state.selectOrders.slice(0, index),
						...this.state.selectOrders.slice(index + 1)]});
				} else {
					this.setState({selectOrders: [...this.state.selectOrders, order]});
				}
				break;
		}
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
	onHandleEditorClose = () => {
		this.setState({editDialogOpen: false});
	}
	onEdit = () => {
		this.setState({editDialogOpen: true});	
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;
		const { selectOrders, editDialogOpen } = this.state;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill flex-row padding'>
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
					<div className='flex flex-fill margin-left'>
						<Paper className='flex margin-bottom padding-horizontal'>
							<PaginationSearchTitle pageInfo={this.props.viewer.orders.pageInfo}
								first={first} after={after} last={last} before={before}
								onSearch={this.onSearch} onNavigate={this.onNavigate}/>
						</Paper>
						<OrderList connection={this.props.viewer.orders}
							onAction={this.onOrderAction} selectMode={true}
							selects={selectOrders}/>
					</div>
				</div>
				{(selectOrders.length>0)&&
					<FloatingActionButton style={styles.floatButton} onClick={this.onEdit}>
						<IconEditor/>
					</FloatingActionButton>
				}
				<OrderBulkUpdateDialog viewer={this.props.viewer} open={editDialogOpen}
					handleClose={this.onHandleEditorClose} selectOrders={selectOrders}/>
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
				${OrderBulkUpdateDialog.getFragment('viewer')}
			}
		`
	}
});

export default {
	component,
	queries,
	prepareParams
};

