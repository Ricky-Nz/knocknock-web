import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Toggle from 'material-ui/Toggle';
import { InputBox } from '../widgets';
import { TimeSlotUpdateMutation } from '../mutations';

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
		const limit = this.refs.limit.getValue();

		if (!limit) return;

		Relay.Store.commitUpdate(new TimeSlotUpdateMutation({
			slot: this.props.slot,
			limit,
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
	onEnableToggle = () => {
		this.setState({enabled: !this.state.enabled});
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
					<InputBox ref='start' value={slot&&slot.start} disabled={true} floatingLabelText='From'
						type='number' verify='time' errorText='time must between 0 ~ 23'/>						
					<InputBox ref='end' value={slot&&slot.end} disabled={true} floatingLabelText='To'
						type='number' verify='time' errorText='time must between 0 ~ 23'/>
					<InputBox ref='limit' value={slot&&slot.limit} floatingLabelText='Limit'
						type='number'/>
					<br/>
					<Toggle label='Enabled' toggled={this.state.enabled} onToggle={this.onEnableToggle}/>
	    	</div>
      </Dialog>
		);
	}
}

TimeSlotDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	slot: PropTypes.object
};

export default TimeSlotDialog


