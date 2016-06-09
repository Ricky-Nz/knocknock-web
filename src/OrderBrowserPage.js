import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';
import { AddFloatButton } from './widgets';
import { OrderList, PaginationSearchBar, OrderStatusDropdownMenu,
	OrderStatusMultiSelectMenu, OrderDateRangeSelector, UserInputAutoComplete,
	OrderBulkUpdateDialog } from './components';
import { pageInfoFragment, paginationVariables } from './utils';

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
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	onSelectStatus = (statusIds) => {
		this.props.relay.setVariables({statusIds});
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
							<OrderStatusMultiSelectMenu viewer={this.props.viewer}
								onSelect={this.onSelectStatus}/>
						</Paper>
					</div>
					<div className='flex flex-fill margin-left'>
						<PaginationSearchBar pageInfo={this.props.viewer.orders.pageInfo}
							first={first} after={after} last={last} before={before}
							onSearch={this.onSearch} onNavigate={this.onNavigate}/>
						<br/>
						<OrderList connection={this.props.viewer.orders}
							onAction={this.onOrderAction} selectMode={true}
							selects={selectOrders}/>
					</div>
				</div>
				{(selectOrders.length>0)&&
					<FloatingActionButton className='page-float-button' onClick={this.onEdit}>
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

export default Relay.createContainer(OrderBrowserPage, {
	...paginationVariables({
		userId: null,
		statusIds: null,
		afterDate: null,
		beforeDate: null
	}),
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				orders(userId:$userId,statusIds:$statusIds,afterDate:$afterDate,beforeDate:$beforeDate,search:$search,first:$first,after:$after) @skip(if: $reverse) {
					${OrderList.getFragment('connection')}
					pageInfo {
					  ${pageInfoFragment}
					}
				}
				orders(userId:$userId,statusIds:$statusIds,afterDate:$afterDate,beforeDate:$beforeDate,search:$search,last:$last,before:$before) @include(if: $reverse) {
					${OrderList.getFragment('connection')}
					pageInfo {
					  ${pageInfoFragment}
					}
				}
				${OrderStatusDropdownMenu.getFragment('viewer')}
				${OrderStatusMultiSelectMenu.getFragment('viewer')}
				${UserInputAutoComplete.getFragment('viewer')}
				${OrderBulkUpdateDialog.getFragment('viewer')}
			}
		`
	}
});

