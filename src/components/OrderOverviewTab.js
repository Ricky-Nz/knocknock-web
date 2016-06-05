import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';
import IconDone from 'material-ui/svg-icons/action/done';
import IconCancel from 'material-ui/svg-icons/content/clear';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Tabs, Tab } from 'material-ui/Tabs';
import { InputBox } from '../widgets';
import OrderStatusDropdownMenu from './OrderStatusDropdownMenu';
import FactoryInputAutoComplete from './FactoryInputAutoComplete';

class OrderOverViewTab extends Component {
	constructor(props) {
		super(props);
		const { status, pickupWorkerId, express, note } = this.props.order;
		this.state = {
			editMode: false,
			status,
			pickupWorkerId,
			express,
			note
		};
	}
	onSelectStatus = (event, index, status) => {
		this.setState({status});
	}
	onSelectFactory = (factory) => {

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
	onSubmit = () => {

	}
	render() {
		const { editMode, status, pickupWorkerId, express, note } = this.state;
		const { order, user } = this.props;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-row flex-fill padding margin-horizontal'>
					<div className='flex flex-fill'>
						<OrderStatusDropdownMenu viewer={this.props.viewer} disabled={!editMode}
							select={status} onSelect={this.onSelectStatus}/>
						<FactoryInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectFactory}/>
						<TextField floatingLabelText='Note' multiLine={true} rows={2}
							value={note} disabled={!editMode} onChange={this.onNoteChange}/>
						<br/>
						<Toggle label='Express Order' disabled={!editMode} toggle={express} onToggle={this.onToggleExpress}/>
					</div>
					<div className='flex flex-fill flex-align-center'>
						<Avatar src={user.avatarUrl} size={100}/>
						<div className='padding'>
							<p>{`Name: ${user.name}`}</p>
							<p>{`Email: ${user.email}`}</p>
							<p>{`Contact: ${user.contact}`}</p>
						</div>
					</div>
				</div>
				{editMode?
					<div className='flex flex-row page-float-button'>
						<FloatingActionButton onClick={this.onCancel}>
							<IconCancel/>
						</FloatingActionButton>
						<FloatingActionButton className='margin-left' onClick={this.onSubmit}>
							<IconDone/>
						</FloatingActionButton>
					</div>:
					<FloatingActionButton className='page-float-button' onClick={this.onEdit}>
						<IconEditor/>
					</FloatingActionButton>
				}
			</div>
		);
	}
}

export default Relay.createContainer(OrderOverViewTab, {
	fragments: {
		order: () => Relay.QL`
			fragment on Order {
				express
				note
				status
				pickupDate
				pickupTime
				pickupAddress
				pickupWorkerId
				serialNumber
				totalPrice
			}
		`,
		user: () => Relay.QL`
			fragment on User {
				name
				email
				contact
				avatarUrl
			}
		`,
		viewer: () => Relay.QL`
			fragment on Viewer {
				${OrderStatusDropdownMenu.getFragment('viewer')}
				${FactoryInputAutoComplete.getFragment('viewer')}
			}
		`
	}
});

