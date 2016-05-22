import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const AlertDialog = ({title, message, modal, open, onCancel, onSubmit}) => (
  <Dialog title={title}
    actions={[
      <FlatButton label='Cancel' primary={true}
        onClick={this.onCancel}/>,
      <FlatButton label='Submit' primary={true}
        onClick={this.onSubmit}/>
    ]} modal={modal} open={this.open}
    onRequestClose={this.onCancel}>
    {message}
  </Dialog>
);

AlertDialog.propTypes = {
	title: PropTypes.string.isRequired,
	message: PropTypes.string,
	modal: PropTypes.bool,
	open: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

AlertDialog.defaultProps = {
	modal: false
};

export default AlertDialog;