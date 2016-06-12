import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { AlertDialog } from '../widgets';
import { DeleteTimeSlotMutation } from '../mutations';

class TimeSlotDeleteDialog extends Component {
  state = {
    submitting: false
  }
  onSubmit = () => {
    Relay.Store.commitUpdate(new DeleteTimeSlotMutation({viewer: this.props.viewer, id: this.props.timeSlot.id}),
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
    const { open, timeSlot } = this.props;
    if (!timeSlot) return null;

    return (
      <AlertDialog open={open} submitting={this.state.submitting}
        message={`Delete Time Slot: ${timeSlot.start} ~ ${timeSlot.end}`}
        onSubmit={this.onSubmit} onCancel={this.props.handleClose}/>
    );
  }
}

TimeSlotDeleteDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  timeSlot: PropTypes.object
};

export default Relay.createContainer(TimeSlotDeleteDialog, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${DeleteTimeSlotMutation.getFragment('viewer')}
      }
    `
  } 
});