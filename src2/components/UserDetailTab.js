import React, { Component } from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';
import IconClear from 'material-ui/svg-icons/content/clear';
import IconDone from 'material-ui/svg-icons/action/done';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import { InputBox } from '../widgets';
import AddressList from './AddressList';
import AddressDialog from './AddressDialog';

class UserDetailTab extends Component {
	state = {
		editMode: false,
		showDialog: false,
		selectAddress: null
	}
	onEdit = () => {
		this.setState({editMode: true});
	}
	onExitEdit = () => {
		this.setState({editMode: false});
	}
	onNewAddress = () => {
		this.setState({
			selectAddress: null,
			showDialog: true
		});
	}
	onAddressAction = (address, action) => {
		switch(action) {
			case 'EDIT':
				this.setState({
					selectAddress: address,
					showDialog: true
				});
				break;
			case 'DELETE':
				break;
		}
	}
	handleDialogClose = () => {
		this.setState({showDialog: false});
	}
	render() {
		const { editMode, showDialog, selectAddress } = this.state;
		const { email, name, contact, emailVerified, contactVerified, avatarUrl } = this.props.user;

		return (
			<div className='flex flex-fill'>
				<div className='flex scroll padding'>
					<Paper>
						<div className='position-relative'>
							<div className='flex flex-row'>
								<div className='padding'>
									<Avatar src={avatarUrl} size={100}/>
								</div>
								<div className='flex flex-fill margin-left'>
					        <InputBox ref='email' value={email} disabled={!editMode} floatingLabelText='Email'
					        	verify='email' errorText='please enter a valid email address'/>
					        <InputBox ref='name' value={name} disabled={!editMode} floatingLabelText='Name'/>
					        <InputBox ref='contact' value={contact} disabled={!editMode} floatingLabelText='Contact'/>
								</div>
							</div>
							{editMode?
								<div className='flex flex-row' style={styles.floatBottomRight}>
									<IconButton onClick={this.onExitEdit}>
									  <IconClear/>
									</IconButton>
									<IconButton style={styles.marginLeft}>
									  <IconDone/>
									</IconButton>
								</div> :
								<IconButton style={styles.floatBottomRight} onClick={this.onEdit}>
								  <IconEditor/>
								</IconButton>
							}
						</div>
					</Paper>
					<div className='flex flex-row flex-space-between flex-align-center padding-vertical'>
						<Subheader>ADDRESSES</Subheader>
						<RaisedButton label='Add' onClick={this.onNewAddress}/>
					</div>
					<AddressList connection={this.props.user.addresses}
						onAction={this.onAddressAction}/>
				</div>
				<AddressDialog open={showDialog} user={this.props.user}
					address={selectAddress} handleClose={this.handleDialogClose}/>
			</div>
		);
	}
}

const styles = {
	floatBottomRight: {
		position: 'absolute',
		right: 8,
		bottom: 8
	},
	marginLeft: {
		marginLeft: 8
	}
};

export default Relay.createContainer(UserDetailTab, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				id
				role
				email
				name
				contact
				avatarUrl
				emailVerified
				contactVerified
				addresses(first:100) {
					${AddressList.getFragment('connection')}
				}
				${AddressDialog.getFragment('user')}
			}
		`
	}
});