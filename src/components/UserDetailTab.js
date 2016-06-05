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
import { InputBox, AvatarEditor } from '../widgets';
import AddressList from './AddressList';
import AddressDialog from './AddressDialog';
import CircularProgress from 'material-ui/CircularProgress';
import { UserUpdateMutation } from '../mutations';

class UserDetailTab extends Component {
	state = {
		submitting: false,
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
	onSubmit = () => {
		const user = this.props.user;
		const name = this.refs.name.getValue();
		const contact = this.refs.contact.getValue();
		const file = this.refs.avatar.getFile();

		if (!user || !contact) return;

		let update = {};
		if (user.name !== name) {
			update.name = name;
		}
		if (user.contact !== contact) {
			update.contact = contact;
		}

		if (Object.keys(update).length === 0 && !file) {
			return this.setState({editMode: false});
		}

		Relay.Store.commitUpdate(new UserUpdateMutation({
			user: this.props.user,
			file,
			...update
		}), {onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onSuccess = () => {
		this.setState({submitting: false, editMode: false});
	}
	onFailure = (transaction) => {
		this.setState({submitting: false});
	}
	onNewAddress = () => {
		this.setState({
			selectAddress: null,
			showDialog: true
		});
	}
	onSelectAddress = (address) => {
		this.setState({
			selectAddress: address,
			showDialog: true
		});
	}
	handleDialogClose = () => {
		this.setState({showDialog: false});
	}
	handleDeleteDialogClose = () => {
		this.setState({showDeleteDialog: false});	
	}
	render() {
		const { submitting, editMode, showDialog, selectAddress } = this.state;
		const { email, name, contact, emailVerified, contactVerified, avatarUrl } = this.props.user;

		return (
			<div className='flex flex-fill scroll padding'>
				<Paper>
					<div className='position-relative'>
						<div className='flex flex-row padding'>
							<div className='padding'>
								<AvatarEditor ref='avatar' src={avatarUrl} enable={editMode}/>
							</div>
							<div className='flex flex-fill margin-left'>
				        <InputBox value={email} disabled={true} floatingLabelText='Email'
				        	verify='email' errorText='please enter a valid email address'/>
				        <InputBox ref='name' value={name} disabled={!editMode} floatingLabelText='Name'
				        	verify='notempty' errorText='name can not be empty'/>
				        <InputBox ref='contact' value={contact} disabled={!editMode} floatingLabelText='Contact'
				        	verify='phonenumber' errorText='pleaese enter a valid phone number'/>
							</div>
						</div>
						{editMode? (
								submitting ? <CircularProgress style={styles.floatBottomRight} size={0.5}/> :
									<div className='flex flex-row' style={styles.floatBottomRight}>
										<IconButton onClick={this.onExitEdit}>
										  <IconClear/>
										</IconButton>
										<IconButton onClick={this.onSubmit} style={styles.marginLeft}>
										  <IconDone/>
										</IconButton>
									</div>
							) :
							<IconButton style={styles.floatBottomRight} onClick={this.onEdit}>
							  <IconEditor/>
							</IconButton>
						}
					</div>
				</Paper>
				<div className='flex flex-row flex-space-between flex-align-center padding-top'>
					<Subheader>ADDRESSES</Subheader>
					<RaisedButton label='Add' onClick={this.onNewAddress}/>
				</div>
				<AddressList connection={this.props.user.addresses}
					onSelect={this.onSelectAddress}/>
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
				${UserUpdateMutation.getFragment('user')}
			}
		`
	}
});