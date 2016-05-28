import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import CategorySelectMenu from './CategorySelectMenu';
import { InputBox, DropZone, Toast } from '../widgets';
import { UserCreateMutation } from '../mutations';

class UserDialog extends Component {
	state = {
		submitting: false
	}
	onComfirm = () => {
		const email = this.refs.email.getValue();
		const password = this.refs.password.getValue();
		const confirmPassword = this.refs.confirmPassword.getValue();
		const name = this.refs.name.getValue();
		const contact = this.refs.contact.getValue();
		const file = this.refs.dropzone.getFile();

		if (!email || !password || !confirmPassword
			|| !name || !contact) {
			return;
		}

		Relay.Store.commitUpdate(new UserCreateMutation({
			viewer: this.props.viewer,
			file,
			email,
			password,
			name,
			contact,
			role: this.props.role
		}), {onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onSuccess = () => {
		this.setState({submitting: false});
		this.props.handleClose();
	}
	onFailure = (transaction) => {
		this.setState({submitting: false});
	  var error = transaction.getError() || new Error('Mutation failed.');
	  console.log(error);
	}
	onPasswordChange = (value) => {
		this.setState({password: value});
	}
	render() {
		const { role, handleClose, open } = this.props;
		const { submitting, password } = this.state;

		return (
      <Dialog title={`New ${role}`} modal={false} open={open}
        actions={[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      submitting?<CircularProgress size={0.5}/>:<FlatButton label='Submit' disabled={submitting} primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose}>
			    <div className='flex flex-row flex-fill scroll'>
		        <DropZone ref='dropzone' style={styles.dropZone} multiple={false} accept='image/*'/>
				    <div className='flex flex-fill margin-left'>
			        <InputBox ref='email' floatingLabelText='Email' fullWidth={true}
			        	verify='email' errorText='please enter a valid email address'/>
			        <InputBox ref='password' floatingLabelText='Password' fullWidth={true}
			        	type='password' verify='password' errorText='password must contains at least 8 character'
			        	onChange={this.onPasswordChange}/>
							<InputBox ref='confirmPassword' floatingLabelText='Confirm Password' fullWidth={true}
			        	type='password' verify={password} errorText='password not match'/>
			        <InputBox ref='name' floatingLabelText='Name' fullWidth={true}
			        	verify='notempty' errorText='name can not be empty'/>
			        <InputBox ref='contact' type='number' floatingLabelText='Contact Number' fullWidth={true}
			        	verify='notempty' errorText='contact number can not be empty'/>
		        </div>
	        </div>
	        <Toast ref='toast'/>
      </Dialog>
		);
	}
}

UserDialog.propTypes = {
	role: PropTypes.oneOf(['client', 'worker', 'admin']).isRequired,
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};

const styles = {
	dropZone: {
		height: 150,
		width: 150
	}
};

export default Relay.createContainer(UserDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${UserCreateMutation.getFragment('viewer')}
			}
		`
	}
});