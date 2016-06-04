import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Toggle from 'material-ui/Toggle';
import CategorySelectMenu from './CategorySelectMenu';
import { InputBox, DropZone, Toast } from '../widgets';
import { UserCreateMutation, WorkerCreateMutation, WorkerDeleteMutation } from '../mutations';

class AccoutDialog extends Component {
	state = {
		submitting: false,
		enabled: true
	}
	onComfirm = () => {
		const email = this.refs.email.getValue();
		const password = this.refs.password.getValue();
		const confirmPassword = this.refs.confirmPassword.getValue();
		const name = this.refs.name.getValue();
		const contact = this.refs.contact.getValue();
		const file = this.refs.dropzone.getFile();
		const { enabled } = this.state;

		if (!email || !password || !confirmPassword
			|| !name || !contact) {
			return;
		}

		const args = {
			viewer: this.props.viewer,
			file,
			enabled,
			email,
			password,
			name,
			contact
		};

		let mutation;
		switch(this.props.role) {
			case 'client':
				mutation = new UserCreateMutation(args);
				break;
			case 'worker':
				mutation = new WorkerCreateMutation(args);
				break;
		}

		Relay.Store.commitUpdate(mutation, {onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onDelete = () => {
		switch(this.props.role) {
			case 'client':
				
				break;
			case 'worker':
				this.props.relay.commitUpdate(new WorkerDeleteMutation({

				}), {onSuccess: this.onSuccess, onFailure: this.onFailure})
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
	render() {
		const { role, handleClose, open } = this.props;
		const { enabled, submitting, password } = this.state;

		return (
      <Dialog title={`New ${role}`} modal={false} open={open}
        actions={submitting?[<CircularProgress size={0.5}/>]:[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      <FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose} autoScrollBodyContent={true}>
			    <div className='flex flex-row padding-top'>
				    <div className='flex margin-right'>
			        <InputBox ref='email' floatingLabelText='Email'
			        	verify='email' errorText='please enter a valid email address'/>
			        <InputBox ref='password' floatingLabelText='Password'
			        	type='password' verify='password' errorText='password must contains at least 8 character'
			        	onChange={this.onPasswordChange}/>
							<InputBox ref='confirmPassword' floatingLabelText='Confirm Password'
			        	type='password' verify={password} errorText='password not match'/>
			        <InputBox ref='name' floatingLabelText='Name'
			        	verify='notempty' errorText='name can not be empty'/>
			        <InputBox ref='contact' type='number' floatingLabelText='Contact Number'
			        	verify='notempty' errorText='contact number can not be empty'/>
			        <br/>
							<Toggle label='Enabled' toggled={enabled} onToggle={this.onEnableToggle}/>
		        </div>
		        <DropZone ref='dropzone' className='flex flex-fill'
		        	multiple={false} accept='image/*'/>
	        </div>
      </Dialog>
		);
	}
}

AccoutDialog.propTypes = {
	role: PropTypes.oneOf(['client', 'worker']).isRequired,
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};

const styles = {
	dropZone: {
		height: 150,
		width: 150
	}
};

export default Relay.createContainer(AccoutDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${UserCreateMutation.getFragment('viewer')}
				${WorkerCreateMutation.getFragment('viewer')}
				${WorkerDeleteMutation.getFragment('viewer')}
			}
		`
	}
});