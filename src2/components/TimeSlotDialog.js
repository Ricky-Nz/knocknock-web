import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Toggle from 'material-ui/Toggle';
import { InputBox, DropZone, Toast } from '../widgets';
import { TimeSlotCreateMutation, TimeSlotUpdateMutation } from '../mutations';

class TimeSlotDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submitting: false,
			enabled: (props.timeSlot&&props.timeSlot.enabled)||true
		};
	}
	onToggle = () => {
		this.setState({enabled: !this.state.enabled});
	}
	onComfirm = () => {
		const timeSlot = this.props.timeSlot;
		const start = this.refs.start.getValue();
		const end = this.refs.end.getValue();
		const enabled = this.state.enabled;

		if (!start || !end) {
			return;
		}

		let mutation;
		if (!timeSlot) {
			mutation = new TimeSlotCreateMutation({
				viewer: this.props.viewer,
				start,
				end,
				enabled
			});
		} else {
			let update = {};
			if (start !== timeSlot.start) {
				update.start = start;
			}
			if (end !== timeSlot.end) {
				update.end = end;
			}

			if (Object.keys(update).length === 0 && timeSlot.enabled === enabled) {
				return this.props.handleClose();
			}

			mutation = new TimeSlotUpdateMutation({
				id: timeSlot.id,
				...update,
				enabled
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
	}
	render() {
		const { handleClose, open, timeSlot } = this.props;

		return (
      <Dialog title={timeSlot?'Edit Slot':'New Slot'} modal={false} open={open}
        actions={[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      this.state.submitting?<CircularProgress size={0.5}/>:<FlatButton label='Submit' disabled={this.state.submitting} primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose}>
		    	<div className='flex flex-row flex-align-center'>
						<InputBox ref='start' value={timeSlot&&timeSlot.start} floatingLabelText='From'
							type='number'/>						
						<InputBox ref='end' value={timeSlot&&timeSlot.end} floatingLabelText='To'
							type='number'/>
		    	</div>
		    	<Toggle label='Enable' toggled={this.state.enabled} onToggle={this.onToggle}/>
      </Dialog>
		);
	}
}

TimeSlotDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	timeSlot: PropTypes.object
};

export default Relay.createContainer(TimeSlotDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${TimeSlotCreateMutation.getFragment('viewer')}
			}
		`
	}
});


