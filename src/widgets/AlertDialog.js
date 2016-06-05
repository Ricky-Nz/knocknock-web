import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

class AlertDialog extends Component {
  render() {
    const { open, submitting, onSubmit, onCancel, title, message } = this.props;

    return (
      <Dialog title={title}
        actions={[
          <FlatButton label='Cancel' primary={true}
            onClick={onCancel}/>,
          submitting ? <CircularProgress size={0.5}/>
           : <FlatButton label='Submit' primary={true} onClick={onSubmit}/>
        ]} modal={false} open={open} onRequestClose={onCancel}>
        {message}
      </Dialog>
    );
  }
}

AlertDialog.propTypes = {
	open: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string
};

export default AlertDialog;