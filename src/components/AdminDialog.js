import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { InputBox } from '../widgets';
import { AdminCreateMutation, AdminUpdateMutation, AdminDeleteMutation } from '../mutations';

class AdminDialog extends Component {
	state = {
		submitting: false
	}
	onComfirm = () => {
		const admin = this.props.admin;
		const email = this.refs.email.getValue();
		const name = this.refs.name.getValue();
		const contact = this.refs.contact.getValue();

		if (!email || !name || !contact) return;

		let mutation;
		if (!admin) {
			const password = this.refs.password.getValue();
			const confirmPassword = this.refs.confirmPassword.getValue();

			if (!password || !confirmPassword) return;

			mutation = new AdminCreateMutation({
				viewer: this.props.viewer,
				password,
				email,
				name,
				contact
			});
		} else {
			mutation = new AdminUpdateMutation({
				admin,
				name,
				contact
			});
		}

		this.props.relay.commitUpdate(mutation, {onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onDelete = () => {
    this.props.relay.commitUpdate(new AdminDeleteMutation({
    	viewer: this.props.viewer,
    	id: this.props.admin.id
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
	onPasswordChange = (value) => {
		this.setState({password: value});
	}
	render() {
		const { handleClose, open, admin } = this.props;
		const { submitting, password } = this.state;

		return (
      <Dialog title={admin?'Edit Admin':'New Admin'} modal={false} open={open}
        actions={submitting?[<CircularProgress size={0.5}/>]:[
        	<FlatButton label='Delete' secondary={true} onTouchTap={this.onDelete}/>,
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      <FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose} autoScrollBodyContent={true}>
		    <div className='flex flex-fill'>
	        <InputBox ref='email' floatingLabelText='Email' disabled={admin!==null} value={admin&&admin.email}
	        	verify='email' errorText='please enter a valid email address'/>
	        {!admin&&
						<InputBox ref='password' floatingLabelText='Password'
							type='password' verify='password' errorText='password must contains at least 8 character'
							onChange={this.onPasswordChange}/>
	        }
	        {!admin&&
						<InputBox ref='confirmPassword' floatingLabelText='Confirm Password'
		        	type='password' verify={password} errorText='password not match'/>
	        }
	        <InputBox ref='name' floatingLabelText='Name' value={admin&&admin.name}
	        	verify='notempty' errorText='name can not be empty'/>
	        <InputBox ref='contact' floatingLabelText='Contact Number' value={admin&&admin.contact}
	        	verify='phonenumber' errorText='please enter a valid phone number'/>
        </div>
      </Dialog>
		);
	}
}

AdminDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	admin: PropTypes.object
};

export default Relay.createContainer(AdminDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${AdminCreateMutation.getFragment('viewer')}
				${AdminDeleteMutation.getFragment('viewer')}
			}
		`
	}
});