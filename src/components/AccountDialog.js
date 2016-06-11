import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import CategorySelectMenu from './CategorySelectMenu';
import { InputBox, DropZone, Toast } from '../widgets';
import { CreateAdminMutation, UpdateAdminMutation, DeleteAdminMutation,
	CreateWorkerMutation, UpdateWorkerMutation, DeleteWorkerMutation,
	CreateUserMutation } from '../mutations';

class AccountDialog extends Component {
	state = {
		submitting: false,
		resetPassword: false,
		enabled: true
	}
	onComfirm = () => {
		const account = this.props.account;
		const email = this.refs.email.getValue();
		const firstName = this.refs.firstName.getValue();
		const lastName = this.refs.lastName.getValue();
		const contact = this.refs.contact.getValue();
		const file = this.refs.dropzone&&this.refs.dropzone.getFile();
		let password, confirmPassword;

		if (!account || this.state.resetPassword) {
			password = this.refs.password.getValue();
			confirmPassword = this.refs.confirmPassword.getValue();

			if (!password || !confirmPassword) return;
		}

		const args = {
			password,
			firstName,
			lastName,
			contact,
			file,
			...(this.props.role!=='admin')&&{
				enabled: this.state.enabled
			}
		};

		let mutation;
		switch(this.props.role) {
			case 'admin':
				if (account) {
					mutation = new UpdateAdminMutation({
						admin: account,
						...args
					});
				} else {
					mutation = new CreateAdminMutation({
						viewer: this.props.viewer,
						email,
						...args
					});
				}
				break;
			case 'client':
				mutation = new CreateUserMutation({
					viewer: this.props.viewer,
					email,
					...args
				});
				break;
			case 'worker':
				if (account) {
					mutation = new UpdateWorkerMutation({
						worker: account,
						...args
					});
				} else {
					mutation = new CreateWorkerMutation({
						viewer: this.props.viewer,
						email,
						...args
					});
				}
				break;
		}

		Relay.Store.commitUpdate(mutation, {onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onDelete = () => {
		switch(this.props.role) {
			case 'admin':
				this.props.relay.commitUpdate(new DeleteAdminMutation({
					viewer: this.props.viewer,
					admin: this.props.account
				}), {onSuccess: this.onSuccess, onFailure: this.onFailure})
				this.setState({submitting: true});
				break;
			case 'worker':
				this.props.relay.commitUpdate(new DeleteWorkerMutation({
					viewer: this.props.viewer,
					worker: this.props.account
				}), {onSuccess: this.onSuccess, onFailure: this.onFailure})
				this.setState({submitting: true});
				break;
		}
	}
	onSuccess = () => {
		this.setState({submitting: false});
		this.props.handleClose();
	}
	onFailure = (transaction) => {
		this.setState({submitting: false});
	}
	onPasswordChange = (value) => {
		this.setState({password: value});
	}
	onEnableToggle = () => {
		this.setState({enabled: !this.state.enabled});
	}
	onChangeResetPassword = () => {
		this.setState({resetPassword: !this.state.resetPassword});
	}
	render() {
		const { role, handleClose, open, account } = this.props;
		const { enabled, submitting, resetPassword, password } = this.state;

		let actions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
      <FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		];
		
		if (account) {
			actions.splice(0, 0, <FlatButton label='Delete' secondary={true} onTouchTap={this.onDelete}/>);
		}

		return (
      <Dialog title={`New ${role}`} modal={false} open={open}
        actions={submitting?[<CircularProgress size={0.5}/>]:actions}
        onRequestClose={handleClose} autoScrollBodyContent={true}>
			    <div className='flex flex-row padding-top'>
				    <div className='flex margin-right'>
			        <InputBox ref='email' floatingLabelText='Email' value={account&&account.email}
			        	disabled={!!account} verify='email' errorText='please enter a valid email address'/>
			        {account&&<Checkbox label='Reset password' checked={resetPassword} onCheck={this.onChangeResetPassword}/>}
			        {(!account||resetPassword)&&
			        	<InputBox ref='password' floatingLabelText='Password'
				        	type='password' verify='password' errorText='password must contains at least 8 character'
				        	onChange={this.onPasswordChange}/>
			        }
			        {(!account||resetPassword)&&
								<InputBox ref='confirmPassword' floatingLabelText='Confirm Password'
				        	type='password' verify={password} errorText='password not match'/>
			        }
			        <InputBox ref='firstName' floatingLabelText='First Name' value={account&&account.firstName}/>
			        <InputBox ref='lastName' floatingLabelText='Last Name' value={account&&account.lastName}/>
			        <InputBox ref='contact' type='number' floatingLabelText='Contact Number' value={account&&account.contact}
			        	verify='notempty' errorText='contact number can not be empty'/>
			        <br/>
							{role!=='admin'&&<Toggle label='Enabled' toggled={enabled} onToggle={this.onEnableToggle}/>}
		        </div>
		        {role!=='admin'&&
			        <DropZone ref='dropzone' className='flex flex-fill'
			        	required imageUrl={account&&account.avatarUrl} multiple={false} accept='image/*'/>
		        }
	        </div>
      </Dialog>
		);
	}
}

AccountDialog.propTypes = {
	role: PropTypes.oneOf(['admin', 'client', 'worker']).isRequired,
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	account: PropTypes.object
};

export default Relay.createContainer(AccountDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${CreateUserMutation.getFragment('viewer')}
				${CreateWorkerMutation.getFragment('viewer')}
				${CreateAdminMutation.getFragment('viewer')}
				${DeleteWorkerMutation.getFragment('viewer')}
				${DeleteAdminMutation.getFragment('viewer')}
			}
		`
	}
});