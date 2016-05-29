import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import Toggle from 'material-ui/Toggle';
import IconNavBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Tabs, Tab } from 'material-ui/Tabs';
import { UserInputAutoComplete, AddressDropdownMenu, ClothInputAutoComplete,
	OrderStatusDropdownMenu, TimeSlotDropdownMenu, WorkerInputAutoComplete,
	OrderItemListItem } from './components';
import IconDone from 'material-ui/svg-icons/action/done';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import { OrderCreateMutation } from './mutations';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

class OrderCreatePage extends Component {
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
	onBack = () => {
		this.context.router.goBack();
	}
	onSelectUser = (user) => {
		this.props.relay.setVariables({userId: user.id});
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
			user: this.props.viewer.user,
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
	onSuccess = ({createOrder}) => {
		console.log(createOrder);
		this.setState({submitting: false});
		// this.context.router.replace(`/dashboard/order/`)
	}
	onFailure = (transaction) => {
		this.setState({submitting: false});
	}
	render() {
		const { express, note, submitting, address, status, pickupTime, orderItems } = this.state;
		const useId = this.props.relay.variables.userId;

		return (
			<div className='flex flex-fill'>
			  <AppBar title='New Order'
			    iconElementLeft={<IconButton onClick={this.onBack}><IconBack/></IconButton>}/>
			  <div className='flex flex-fill position-relative'>
					<div className='flex flex-fill padding scroll'>
						<div className='flex flex-row'>
							<Paper className='flex padding'>
								<UserInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectUser}/>
								<AddressDropdownMenu user={this.props.viewer.user||null} disabled={!useId}
									select={address} onSelect={this.onSelectAddress}/>
								<DatePicker hintText='Select Pickup Date' mode='landscape'
									onChange={this.onSelectPickupDate}/>
								<TimeSlotDropdownMenu viewer={this.props.viewer} select={pickupTime}
									onSelect={this.onSelectPickupTime}/>
								<OrderStatusDropdownMenu viewer={this.props.viewer} select={status}
									onSelect={this.onSelectStatus}/>
								<WorkerInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectWorker}/>
								<TextField floatingLabelText='Note' multiLine={true} rows={2}
									value={note} onChange={this.onNoteChange}/>
								<Toggle label='Express' toggled={express} onToggle={this.onToggleExpress}/>
							</Paper>
							<div className='flex flex-fill margin-left'>
								<Paper className='padding-horizontal'>
									<ClothInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectProduct}/>
								</Paper>
								{
									orderItems.map((item, index) =>
										<OrderItemListItem key={index} index={index} itemImageUrl={item.imageUrl}
											itemNameCn={item.nameCn} itemNameEn={item.nameEn} quantity={item.quantity}
											washType={item.washType} onAction={this.onUpdateOrderItem}/>)
								}
							</div>
						</div>
					</div>
					{submitting?<CircularProgress style={styles.floatButton} size={0.5}/>:
						<FloatingActionButton style={styles.floatButton} onClick={this.onSubmit}>
						  <IconDone/>
						</FloatingActionButton>
					}
				</div>
			</div>
		);
	}
}

OrderCreatePage.contextTypes = {
	router: PropTypes.object.isRequired
};

const styles = {
	floatButton: {
		position: 'absolute',
		right: 24,
		bottom: 24
	}
};

const component = Relay.createContainer(OrderCreatePage, {
	initialVariables: {
		userId: null,
		skipFetchUser: true
	},
	prepareVariables: (variables) => {
		return {
			...variables,
			skipFetchUser: !variables.userId
		};
	},
	fragments: {
		viewer: (variables) => Relay.QL`
			fragment on Viewer {
				${UserInputAutoComplete.getFragment('viewer')}
				${OrderStatusDropdownMenu.getFragment('viewer')}
				${TimeSlotDropdownMenu.getFragment('viewer')}
				${WorkerInputAutoComplete.getFragment('viewer')}
				${ClothInputAutoComplete.getFragment('viewer')}
				user(id:$userId) @skip(if: $skipFetchUser) {
					${AddressDropdownMenu.getFragment('user')}
					${OrderCreateMutation.getFragment('user')}
				}
			}
		`
	}
});

export default {
	component,
	queries
};

