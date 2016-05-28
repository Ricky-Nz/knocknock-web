import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { AlertDialog } from '../widgets';
import { FactoryDeleteMutation } from '../mutations';

class FactoryDeleteDialog extends Component {
  state = {
    submitting: false
  }
  onSubmit = () => {
    Relay.Store.commitUpdate(new FactoryDeleteMutation({viewer: this.props.viewer, id: this.props.factory.id}),
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
    const { open, factory } = this.props;
    if (!factory) return null;

    return (
      <AlertDialog open={open} submitting={this.state.submitting}
        message={`Delete Factory: ${factory.name}?`}
        onSubmit={this.onSubmit} onCancel={this.props.handleClose}/>
    );
  }
}

FactoryDeleteDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  factory: PropTypes.object
};

export default Relay.createContainer(FactoryDeleteDialog, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${FactoryDeleteMutation.getFragment('viewer')}
      }
    `
  } 
});