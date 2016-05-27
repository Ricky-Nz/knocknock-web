import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { AlertDialog } from '../widgets';
import { AddressDeleteMutation } from '../mutations';

class AddressDeleteDialog extends Component {
  state = {
    submitting: false
  }
  onSubmit = () => {
    Relay.Store.commitUpdate(new AddressDeleteMutation({user: this.props.user, id: this.props.address.id}),
      {onSuccess: this.onSuccess, onFailure: this.onFailure});
    this.setState({submitting: true});
  }
  onSuccess = () => {
    this.setState({submitting: false});
    this.props.onRequestClose();
  }
  onFailure = (transaction) => {
    this.setState({submitting: false});
  }
  render() {
    const { open, address } = this.props;
    if (!address) return null;

    return (
      <AlertDialog open={open} submitting={this.state.submitting}
        message={`Delete address: ${address.address}, ${address.postalCode}`}
        onSubmit={this.onSubmit} onCancel={this.props.onRequestClose}/>
    );
  }
}

AddressDeleteDialog.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  address: PropTypes.object
};

export default Relay.createContainer(AddressDeleteDialog, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${AddressDeleteMutation.getFragment('user')}
      }
    `
  } 
});