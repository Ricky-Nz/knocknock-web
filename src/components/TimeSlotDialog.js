import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Toggle from 'material-ui/Toggle';
import { InputBox } from '../widgets';
import { UpdateTimeSlotMutation } from '../mutations';

class TimeSlotDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submitting: false,
			enabled: props.slot?props.slot.enabled:true
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.slot !== this.props.slot) {
			this.setState({
				enabled: nextProps.slot?nextProps.slot.enabled:true
			});
		}
	}
	onComfirm = () => {
		Relay.Store.commitUpdate(new UpdateTimeSlotMutation({
			slot: this.props.slot,
			date: this.props.date,
			quantity: this.refs.quantity.getValue(),
			enabled: this.state.enabled
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
		const { handleClose, open, slot } = this.props;

		return (
      <Dialog title='Edit Slot' modal={false} open={open}
        actions={this.state.submitting?[<CircularProgress size={0.5}/>]:[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      <FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
        ]}
        onRequestClose={handleClose} autoScrollBodyContent={true}>
	    	<div className='flex'>
					<InputBox ref='time' value={slot?slot.time:''} disabled={true} floatingLabelText='Time'/>
					<InputBox ref='quantity' value={slot?slot.quantity:0} floatingLabelText='Quantity'
						type='number'/>
	    	</div>
      </Dialog>
		);
	}
}

TimeSlotDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	date: PropTypes.any,
	slot: PropTypes.object
};

export default TimeSlotDialog


