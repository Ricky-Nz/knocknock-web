import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import { AddFloatButton } from './widgets';
import { OrderList, PaginationSearchBar, OrderStatusDropdownMenu,
	OrderStatusMultiSelectMenu, OrderDateRangeSelector, UserInputAutoComplete,
	OrderBulkUpdateDialog } from './components';
import { pageInfoFragment, paginationVariables } from './utils';

class OrderBrowserPage extends Component {
	state = {
		editDialogOpen: false,
		selectMode: false,
		toggleAll: false
	}
	onBack = () => {
		this.context.router.goBack();
	}
	onSelectOrder = (order) => {
		if (this.state.selectMode) {
			console.log(order);
		} else {
			this.context.router.push(`/dashboard/order/${order.userId}/${order.serialNumber}`);
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
		this.props.relay.setVariables({userId: user?user.id:null});
	}
	onHandleEditorClose = () => {
		this.setState({editDialogOpen: false});
	}
	onEdit = () => {
		this.setState({selectMode: true});	
	}
	onCancelEdit = () => {
		this.setState({selectMode: false});		
	}
	onCheckAll = () => {
		this.setState({toggleAll: !this.state.toggleAll});
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;
		const { toggleAll, selectMode, editDialogOpen } = this.state;

		return (
			<div className='flex flex-fill'>
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
						<div className='flex flex-fill'>
							<OrderList connection={this.props.viewer.orders}
								onSelect={this.onSelectOrder} selectMode={selectMode}
								toggleAll={toggleAll}/>
						</div>
						<br/>
						<Paper className='flex flex-row flex-align-center flex-space-between'>
							{!selectMode&&
								<FlatButton label='Edit' primary={true} onClick={this.onEdit}/>
							}
							{selectMode&&
								<div className='flex flex-row'>
									<FlatButton label='Cancel' secondary={true} onClick={this.onCancelEdit}/>
									<FlatButton label='Submit' primary={true}/>
								</div>
							}
							{selectMode&&
								<Checkbox labelPosition='left' style={styles.checkAll} onCheck={this.onCheckAll}/>
							}
						</Paper>
					</div>
				</div>
			</div>
		);
	}
}

OrderBrowserPage.contextTypes = {
	router: PropTypes.object.isRequired
};

const styles = {
	checkAll: {
		width: 60
	}
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

