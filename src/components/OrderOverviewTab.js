import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';
import IconDone from 'material-ui/svg-icons/action/done';
import IconCancel from 'material-ui/svg-icons/content/clear';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Tabs, Tab } from 'material-ui/Tabs';
import { InputBox } from '../widgets';
import OrderItemDisplayItem from './OrderItemDisplayItem';
import OrderStatusDropdownMenu from './OrderStatusDropdownMenu';
import FactoryInputAutoComplete from './FactoryInputAutoComplete';
import OrderItemEditor from './OrderItemEditor';
import WorkerInputAutoComplete from './WorkerInputAutoComplete';
import { UpdateOrderMutation } from '../mutations';

class OrderOverViewTab extends Component {
	constructor(props) {
		super(props);
		const { status, pickupWorkerId, factoryId, express, note } = this.props.order;
		this.state = {
			submitting: false,
			editMode: false,
			statusId: status.id,
			pickupWorkerId,
			factoryId,
			express,
			note,
			orderItems: props.order.orderItems&&props.order.orderItems.edges.map(({node}) => node)
		};
	}
	onSelectStatus = (event, index, statusId) => {
		this.setState({statusId});
	}
	onSelectFactory = (factory) => {
		this.setState({factoryId: factory.id});
	}
	onToggleExpress = () => {
		this.setState({express: !this.state.express});
	}
	onEdit = () => {
		this.setState({editMode: true});
	}
	onCancel = () => {
		this.setState({editMode: false});
	}
	onNoteChange = (event) => {
		this.setState({note: event.target.value});
	}
	onOrderItemChange = (newItems) => {
		this.setState({orderItems: newItems});
	}
	onSelectWorker = (work) => {
		this.setState({pickupWorkerId: work.id});
	}
	onSubmit = () => {
		const {express, pickupWorkerId, note, statusId, factoryId, orderItems} = this.state;
		const toPayPrice = this.refs.toPayPrice.getValue();

		this.props.relay.commitUpdate(new UpdateOrderMutation({
			order: this.props.order,
			express,
			pickupWorkerId,
			factoryId,
			note,
			statusId,
			toPayPrice,
			orderItems: orderItems&&orderItems.map(item => ({
				productId: item.productId,
				quantity: item.quantity,
				washType: item.washType
			}))
		}), {onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onSuccess = () => {
		this.setState({submitting: false, editMode: false});
		this.props.handleClose();
	}
	onFailure = (transaction) => {
		this.setState({submitting: false});
	}
	render() {
		const { submitting, orderItems, editMode, statusId, pickupWorkerId, factoryId, express, note } = this.state;
		const { order, user } = this.props;

		return (
			<div className='flex flex-fill padding margin'>
				<div className='flex flex-fill'>
					<div className='flex scroll'>
						<Avatar src={user.avatarUrl}/>
						<div className='padding-top'>Name: {`${user.firstName} ${user.lastName}`}</div>
						<div>Contact: {user.contact}</div>
						<div>Email: {user.email}</div>
		        <InputBox floatingLabelText='Total Price' value={order&&order.totalPrice} disabled={true}/>
		        <InputBox ref='toPayPrice' floatingLabelText='Payable Price'
		        	value={order&&order.toPayPrice} disabled={!editMode}/>
						<OrderStatusDropdownMenu viewer={this.props.viewer} disabled={!editMode}
							select={statusId} onSelect={this.onSelectStatus}/>
						<WorkerInputAutoComplete viewer={this.props.viewer} selectId={pickupWorkerId}
							disabled={!editMode} onSelect={this.onSelectWorker}/>
						<FactoryInputAutoComplete viewer={this.props.viewer} selectId={factoryId}
							disabled={!editMode} onSelect={this.onSelectFactory}/>
						<TextField floatingLabelText='Note' multiLine={true} rows={2}
							value={note} disabled={!editMode} onChange={this.onNoteChange}/>
						<br/>
						<Toggle label='Express Order' disabled={!editMode} toggle={express} onToggle={this.onToggleExpress}/>
						{editMode?
							<OrderItemEditor viewer={this.props.viewer} orderItems={orderItems}
								onChange={this.onOrderItemChange}/>:
							<div>
								{
									this.props.order.orderItems.edges.map(({node}, index) =>
										<OrderItemDisplayItem key={index} item={node}/>)
								}
							</div>
						}
					</div>
				</div>
				{submitting?
					<div className='flex flex-row flex-end'>
						<CircularProgress size={0.5}/>
					</div>:
					(editMode?
						<div className='flex flex-row flex-end'>
							<FloatingActionButton onClick={this.onCancel}>
								<IconCancel/>
							</FloatingActionButton>
							<FloatingActionButton className='margin-left' onClick={this.onSubmit}>
								<IconDone/>
							</FloatingActionButton>
						</div>:
						<div className='flex flex-row flex-end'>
							<FloatingActionButton className='page-float-button' onClick={this.onEdit}>
								<IconEditor/>
							</FloatingActionButton>
						</div>
					)
				}
			</div>
		);
	}
}

export default Relay.createContainer(OrderOverViewTab, {
	fragments: {
		order: () => Relay.QL`
			fragment on Order {
				id
				displayId
				totalPrice
				toPayPrice
				express
				note
				status {
					id
					status
				}
				pickupDate
				pickupTime
				pickupAddress
				pickupWorkerId
				factoryId
				orderItems(first: 1000) {
					edges {
						node {
							id
							washType
							quantity
							price
							productId
							cloth {
								imageUrl
								nameEn
								nameCn
							}
							${OrderItemDisplayItem.getFragment('item')}
						}
					}
				}
				${UpdateOrderMutation.getFragment('order')}
			}
		`,
		user: () => Relay.QL`
			fragment on User {
				firstName
				lastName
				email
				contact
				avatarUrl
			}
		`,
		viewer: () => Relay.QL`
			fragment on Viewer {
				${OrderStatusDropdownMenu.getFragment('viewer')}
				${FactoryInputAutoComplete.getFragment('viewer')}
				${OrderItemEditor.getFragment('viewer')}
				${WorkerInputAutoComplete.getFragment('viewer')}
			}
		`
	}
});

