import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Toggle from 'material-ui/Toggle';
import { InputBox, DropZone, Toast } from '../widgets';
import { TimeSlotTemplateCreateMutation, TimeSlotTemplateUpdateMutation,
	TimeSlotTemplateDeleteMutation } from '../mutations';

class TimeSlotTemplateDialog extends Component {
	state = {
		submitting: false
	}
	onComfirm = () => {
		const template = this.props.template;
		const start = this.refs.start.getValue();
		const end = this.refs.end.getValue();
		const limit = this.refs.limit.getValue();

		if (!start || !end || !limit) {
			return;
		}

		const updates = {
			start,
			end,
			limit
		};

		let mutation;
		if (!template) {
			mutation = new TimeSlotTemplateCreateMutation({
				viewer: this.props.viewer,
				...updates
			});
		} else {
			mutation = new TimeSlotUpdateMutation({
				id: template.id,
				...updates
			});
		}

		this.props.relay.commitUpdate(mutation,
			{onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onDelete = () => {
		this.props.relay.commitUpdate(new TimeSlotTemplateDeleteMutation({
			id: this.props.template.id
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
		const { handleClose, open, template } = this.props;

		let actions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
      <FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		];

		if (template) {
			actions.splice(0, 0, <FlatButton label='Cancel' secondary={true} onTouchTap={this.onDelete}/>);
		}

		return (
      <Dialog title={template?'Edit Slot':'New Slot'} modal={false} open={open}
        actions={this.state.submitting?[<CircularProgress size={0.5}/>]:actions}
        onRequestClose={handleClose} autoScrollBodyContent={true}>
	    	<div className='flex'>
					<InputBox ref='start' value={template&&template.start} floatingLabelText='From'
						type='number'/>						
					<InputBox ref='end' value={template&&template.end} floatingLabelText='To'
						type='number'/>
					<InputBox ref='limit' value={template&&template.limit} floatingLabelText='Limit'
						type='number'/>
	    	</div>
      </Dialog>
		);
	}
}

TimeSlotTemplateDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	template: PropTypes.object
};

export default Relay.createContainer(TimeSlotTemplateDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${TimeSlotTemplateCreateMutation.getFragment('viewer')}
				${TimeSlotTemplateDeleteMutation.getFragment('viewer')}
			}
		`
	}
});


