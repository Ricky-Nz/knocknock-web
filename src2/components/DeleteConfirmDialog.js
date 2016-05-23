import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { ClothDeleteMutation, CategoryDeleteMutation } from '../mutations';

class DeleteConfigmDialog extends Component {
  state = {
    submitting: false
  }
  onSubmit = () => {
    if (this.props.category) {
      Relay.Store.commitUpdate(new CategoryDeleteMutation({
        id: this.props.category.id,
        viewer: this.props.viewer
      }), {onSuccess: this.onSuccess, onFailure: this.onFailure});
    } else if (this.props.cloth) {
      Relay.Store.commitUpdate(new ClothDeleteMutation({
        id: this.props.cloth.id,
        viewer: this.props.viewer
      }), {onSuccess: this.onSuccess, onFailure: this.onFailure});
    }
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
    const { open, handleClose, category, cloth } = this.props;
    const item = category||cloth;
    if (!item) return null;

    return (
      <Dialog title={`Delete ${item.nameEn}`}
        actions={[
          <FlatButton label='Cancel' primary={true}
            onClick={handleClose}/>,
          this.state.submitting ? <CircularProgress size={0.5}/>
           : <FlatButton label='Submit' primary={true} onClick={this.onSubmit}/>
        ]} modal={false} open={open} onRequestClose={handleClose}>
      </Dialog>
    );
  }
}

DeleteConfigmDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
  category: PropTypes.object,
  cloth: PropTypes.object
};

export default Relay.createContainer(DeleteConfigmDialog, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${CategoryDeleteMutation.getFragment('viewer')}
        ${ClothDeleteMutation.getFragment('viewer')}
      }
    `
  }
});