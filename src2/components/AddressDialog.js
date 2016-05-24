import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { InputBox, DropZone, Toast } from '../widgets';
import { AddressCreateMutation, AddressUpdateMutation } from '../mutations';

class AddressDialog extends Component {
	state = {
		submitting: false
	}
	onComfirm = () => {
		const postalCode = this.refs.postalCode.getValue();
		const contact = this.refs.contact.getValue();
		const address = this.refs.address.getValue();
		const selectAddress = this.props.address;

		if (!postalCode || !contact || !address) {
			return;
		}

		let mutation;
		if (!selectAddress) {
			mutation = new AddressCreateMutation({
				user: this.props.user,
				postalCode,
				contact,
				address
			});
		} else {
			let update = {};
			if (postalCode !== selectAddress.postalCode) {
				update.postalCode = postalCode;
			}
			if (address !== selectAddress.address) {
				update.address = address;
			}
			if (contact !== selectAddress.contact) {
				update.contact = contact;
			}

			if (Object.keys(update).length === 0) {
				return this.props.handleClose();
			}

			mutation = new AddressUpdateMutation({
				id: selectAddress.id,
				...update
			});
		}

		Relay.Store.commitUpdate(mutation,
			{onSuccess: this.onSuccess, onFailure: this.onFailure});
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
	render() {
		const { handleClose, open, address } = this.props;

		return (
      <Dialog title={address?'Edit Address':'New Address'} modal={false} open={open}
        actions={[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      this.state.submitting?<CircularProgress size={0.5}/>:<FlatButton label='Submit' disabled={this.state.submitting} primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose}>
			    <div className='flex'>
			    	<div className='flex flex-row'>
							<InputBox ref='postalCode' value={address&&address.postalCode} floatingLabelText='Postal Code'
								verify='postalcode' errorText='please enter a valid postal code'/>
							<InputBox ref='contact' value={address&&address.contact} floatingLabelText='Contact'
								verify='phonenumber' errorText='please enter a valid phone number'/>
			    	</div>
						<InputBox ref='address' value={address&&address.address} floatingLabelText='Address'
							verify='notempty' errorText='address description can not be empty' fullWidth={true}/>
	        </div>
      </Dialog>
		);
	}
}

AddressDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	address: PropTypes.object
};

export default Relay.createContainer(AddressDialog, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				id
				${AddressCreateMutation.getFragment('user')}
			}
		`
	}
});


