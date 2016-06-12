import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import OrderStatusDropdownMenu from './OrderStatusDropdownMenu';
import WorkerInputAutoComplete from './WorkerInputAutoComplete';
import Subheader from 'material-ui/Subheader';
import { InputBox, DropZone, Toast } from '../widgets';
import { UpdateOrderMutation } from '../mutations';

class OrderBulkUpdateDialog extends Component {
	state = {
		submitting: false,
		pickupWorkerId: null,
		statusId: null
	}
	onComfirm = () => {
		const { statusId, pickupWorkerId } = this.state;
		let update = {};

		if (statusId) {
			update.statusId = statusId;
		}
		if (pickupWorkerId) {
			update.pickupWorkerId = pickupWorkerId;
		}

		if (Object.keys(update).length === 0) return;

		for (const index in this.props.selectOrders) {
			this.props.relay.commitUpdate(new UpdateOrderMutation({
				order: this.props.selectOrders[index],
				...update
			}), {onSuccess: this.onSuccess, onFailure: this.onFailure})
		}
		this.setState({submitting: true});
	}
	onSuccess = (response) => {
		this.setState({submitting: false});
		this.onCloseDialog();
	}
	onFailure = (transaction) => {
		this.setState({submitting: false});
	}
	onSelectStatus = (event, index, statusId) => {
		this.setState({statusId});
	}
	onSelectWorker = (worker) => {
		this.setState({pickupWorkerId: worker.id});
	}
	onCloseDialog = () => {
		this.setState({pickupWorkerId: null, statusId: null});
		this.props.handleClose();
	}
	render() {
		const { open, selectOrders } = this.props;
		const { submitting, statusId } = this.state;

		return (
      <Dialog title={`Update ${selectOrders&&selectOrders.length} Order`} modal={false} open={open}
        actions={submitting?[<CircularProgress size={0.5}/>]:[
		      <FlatButton label='Cancel' primary={true} onTouchTap={this.onCloseDialog}/>,
		      <FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={this.onCloseDialog}>
		   	<div className='flex'>
	    		<OrderStatusDropdownMenu viewer={this.props.viewer} select={statusId} onSelect={this.onSelectStatus}/>
	    		<WorkerInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectWorker}/>
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

