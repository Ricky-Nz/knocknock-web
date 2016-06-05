import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import Toggle from 'material-ui/Toggle';
import AddressDropdownMenu from './AddressDropdownMenu';
import ClothInputAutoComplete from './ClothInputAutoComplete';
import OrderStatusDropdownMenu from './OrderStatusDropdownMenu';
import TimeSlotDropdownMenu from './TimeSlotDropdownMenu';
import WorkerInputAutoComplete from './WorkerInputAutoComplete';
import OrderItemListItem from './OrderItemListItem';
import IconDone from 'material-ui/svg-icons/action/done';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import { OrderCreateMutation } from '../mutations';

class OrderCreateDialog extends Component {
	state = {
		submitting: false,
		express: false,
		address: null,
		pickupDate: null,
		status: null,
		pickupTime: null,
		pickupWorkerId: null,
		note: '',
		orderItems: []
	}
	onSelectWorker = (worker) => {
		this.setState({pickupWorkerId: worker.id});	
	}
	onSelectAddress = (event, index, value) => {
		this.setState({address: value});
	}
	onSelectPickupDate = (_, date) => {
		this.setState({pickupDate: date});
	}
	onSelectPickupTime = (event, index, value) => {
		this.setState({pickupTime: value});
	}
	onSelectStatus = (event, index, value) => {
		this.setState({status: value});
	}
	onSelectProduct = (value) => {
		const index = this.state.orderItems.findIndex(cloth => cloth.id === value.id);
		if (index < 0) {
			this.setState({orderItems: [{...value, quantity: 1, washType: 'Wash&Iron'}, ...this.state.orderItems]});
		} else {
			this.onUpdateOrderItem(index, 'ADD');
		}
	}
	onToggleExpress = () => {
		this.setState({express: !this.state.express});
	}
	onNoteChange = (event) => {
		this.setState({note: event.target.value});
	}
	onUpdateOrderItem = (index, action, args) => {
		const orderItems = this.state.orderItems;
		let quantity = orderItems[index].quantity;
		let washType = orderItems[index].washType;

		switch(action) {
			case 'ADD':
				quantity += 1;
				break;
			case 'REMOVE':
				quantity -= 1;
				break;
			case 'WASH_TYPE':
				washType = args;
				break;
		}

		if (quantity > 100 || quantity <= 0) return;

		this.setState({orderItems: [...orderItems.slice(0, index),
			{...orderItems[index], quantity, washType}, ...orderItems.slice(index + 1)]});
	}
	onSubmit = () => {
		const { express, note, status, pickupDate, pickupTime,
			address, pickupWorkerId, orderItems } = this.state;

		Relay.Store.commitUpdate(new OrderCreateMutation({
			user: this.props.user,
			express,
			note,
			status,
			pickupDate,
			pickupTime: `${pickupTime.start}~${pickupTime.end}`,
			pickupAddress: `${address.address}, ${address.postalCode} (${address.contact} ${address.contactName})`,
			pickupWorkerId,
			orderItems: orderItems.map(item => ({
				productId: item.id,
				washType: item.washType,
				quantity: item.quantity
			}))
		}), {onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onSuccess = () => {
		this.setState({submitting: false});
		this.props.handleClose();
	}
	onFailure = (transaction) => {
		this.setState({submitting: false});
	}
	render() {
		const { express, note, submitting, address, status, pickupDate, pickupTime, orderItems } = this.state;
		const { open, handleClose } = this.props;

		return (
      <Dialog title='New Order' modal={false} open={open}
        actions={submitting?[<CircularProgress size={0.5}/>]:[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      <FlatButton label='Submit' primary={true} onTouchTap={this.onSubmit}/>
		    ]} onRequestClose={handleClose} autoScrollBodyContent={true}>
				<div className='flex flex-row'>
					<div className='flex padding-right'>
						<AddressDropdownMenu user={this.props.user}
							select={address} onSelect={this.onSelectAddress}/>
						<DatePicker hintText='Select Pickup Date' mode='landscape'
							onChange={this.onSelectPickupDate}/>
						<TimeSlotDropdownMenu viewer={this.props.viewer} select={pickupTime}
							date={pickupDate} onSelect={this.onSelectPickupTime}/>
						<OrderStatusDropdownMenu viewer={this.props.viewer} select={status}
							onSelect={this.onSelectStatus}/>
						<WorkerInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectWorker}/>
						<TextField floatingLabelText='Note' multiLine={true} rows={2}
							value={note} onChange={this.onNoteChange}/>
						<Toggle label='Express' toggled={express} onToggle={this.onToggleExpress}/>
					</div>
					<div className='flex flex-fill padding-left'>
						<ClothInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectProduct}/>
						{
							orderItems.map((item, index) =>
								<OrderItemListItem key={index} index={index} itemImageUrl={item.imageUrl}
									itemNameCn={item.nameCn} itemNameEn={item.nameEn} quantity={item.quantity}
									washType={item.washType} onAction={this.onUpdateOrderItem}/>)
						}
					</div>
				</div>
      </Dialog>
		);
	}
}

OrderCreateDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};

export default Relay.createContainer(OrderCreateDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${OrderStatusDropdownMenu.getFragment('viewer')}
				${TimeSlotDropdownMenu.getFragment('viewer')}
				${WorkerInputAutoComplete.getFragment('viewer')}
				${ClothInputAutoComplete.getFragment('viewer')}
			}
		`,
		user: () => Relay.QL`
			fragment on User {
				${AddressDropdownMenu.getFragment('user')}
				${OrderCreateMutation.getFragment('user')}
			}
		`
	}
});