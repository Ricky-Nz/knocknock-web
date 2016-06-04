import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { InputBox, DropZone, Toast } from '../widgets';
import { FactoryCreateMutation, FactoryUpdateMutation, FactoryDeleteMutation } from '../mutations';

class FactoryDialog extends Component {
	state = {
		submitting: false
	}
	onComfirm = () => {
		const factory = this.props.factory;
		const name = this.refs.name.getValue();
		const address = this.refs.address.getValue();
		const postalCode = this.refs.postalCode.getValue();
		const contact = this.refs.contact.getValue();
		const contactName = this.refs.contactName.getValue();

		if (!name || !address || !postalCode || ! contact || !contactName) {
			return;
		}

		let mutation;
		if (!factory) {
			mutation = new FactoryCreateMutation({
				viewer: this.props.viewer,
				name,
				address,
				postalCode,
				contact,
				contactName
			});
		} else {
			let update = {};
			if (name !== factory.name) {
				update.name = name;
			}
			if (address !== factory.address) {
				update.address = address;
			}
			if (postalCode !== factory.postalCode) {
				update.postalCode = postalCode;
			}
			if (contact !== factory.contact) {
				update.contact = contact;
			}
			if (contactName !== factory.contactName) {
				update.contactName = contactName;
			}

			if (Object.keys(update).length === 0) {
				return this.props.handleClose();
			}

			mutation = new FactoryUpdateMutation({
				id: factory.id,
				...update
			});
		}

		Relay.Store.commitUpdate(mutation,
			{onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onDelete = () => {
    this.props.relay.commitUpdate(new FactoryDeleteMutation({
    	viewer: this.props.viewer,
    	id: this.props.factory.id
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
	render() {
		const { handleClose, open, factory } = this.props;

		return (
      <Dialog title={factory?'Edit Factory':'New Factory'} modal={false} open={open}
        actions={this.state.submitting?[<CircularProgress size={0.5}/>]:[
        	<FlatButton label='Delete' secondary={true} onTouchTap={this.onDelete}/>,
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      <FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose}>
		    	<div className='flex'>
						<InputBox ref='name' value={factory&&factory.name} floatingLabelText='Factory Name'
							verify='notempty' errorText='factory name can not be empty'/>						
						<InputBox ref='postalCode' value={factory&&factory.postalCode} floatingLabelText='Postal Code'
							verify='postalcode' errorText='invalid postal code'/>
						<InputBox ref='address' value={factory&&factory.address} floatingLabelText='Address'
							verify='notempty' errorText='address can not be empty'/>
						<InputBox ref='contact' value={factory&&factory.contact} floatingLabelText='Contact Number'
							verify='phonenumber' errorText='invalid phone number'/>
						<InputBox ref='contactName' value={factory&&factory.contactName} floatingLabelText='Contact Name'
							verify='notempty' errorText='contact name can not be empty'/>
		    	</div>
      </Dialog>
		);
	}
}

FactoryDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	factory: PropTypes.object
};

export default Relay.createContainer(FactoryDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${FactoryCreateMutation.getFragment('viewer')}
				${FactoryDeleteMutation.getFragment('viewer')}
			}
		`
	}
});


