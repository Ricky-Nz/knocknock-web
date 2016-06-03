import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import OrderStatusDropdownMenu from './OrderStatusDropdownMenu';
import WorkerInputAutoComplete from './WorkerInputAutoComplete';
import OrderListItem from './OrderListItem';
import Subheader from 'material-ui/Subheader';
import { InputBox, DropZone, Toast } from '../widgets';
import { OrderUpdateMutation } from '../mutations';

class OrderBulkUpdateDialog extends Component {
	state = {
		submitting: false,
		pickupWorkerId: null,
		status: null
	}
	onComfirm = () => {
		const { status, pickupWorkerId } = this.state;
		let update = {};

		if (status) {
			update.status = status;
		}
		if (pickupWorkerId) {
			update.pickupWorkerId = pickupWorkerId;
		}

		if (Object.keys(update).length === 0) return;

		for (const index in this.props.selectOrders) {
			this.props.relay.commitUpdate(new OrderUpdateMutation({
				order: this.props.selectOrders[index],
				...update
			}), {onSuccess: this.onSuccess, onFailure: this.onFailure})
		}
		this.setState({submitting: true});
	}
	onSuccess = (response) => {
		this.setState({submitting: false});
		this.props.handleClose();
	}
	onFailure = (transaction) => {
		this.setState({submitting: false});
	}
	onSelectStatus = (event, index, status) => {
		this.setState({status});
	}
	onSelectWorker = (worker) => {
		this.setState({pickupWorkerId: worker.id});
	}
	render() {
		const { handleClose, open, selectOrders } = this.props;
		const { submitting, status } = this.state;

		return (
      <Dialog title='Update Order' modal={false} open={open}
        actions={[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      submitting?<CircularProgress size={0.5}/>:
		      	<FlatButton label='Submit' disabled={submitting} primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose}>
		    <div className='flex flex-fill flex-row'>
					<List className='flex scroll' style={styles.orderList}>
						{
							selectOrders.map((order, index) => <OrderListItem key={index} order={order}/>)
						}
					</List>
		    	<div className='flex margin-left'>
		    		<OrderStatusDropdownMenu viewer={this.props.viewer} select={status} onSelect={this.onSelectStatus}/>
		    		<WorkerInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectWorker}/>
		    	</div>
		    </div>
      </Dialog>
		);
	}
}

OrderBulkUpdateDialog.propTypes = {
	selectOrders: PropTypes.arrayOf(PropTypes.object),
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};

const styles = {
	orderList: {
		height: 400
	}
};

export default Relay.createContainer(OrderBulkUpdateDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${OrderStatusDropdownMenu.getFragment('viewer')}
				${WorkerInputAutoComplete.getFragment('viewer')}
			}
		`
	}
});

