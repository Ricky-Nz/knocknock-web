import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import CategorySelectMenu from './CategorySelectMenu';
import { InputBox, DropZone, Toast } from '../widgets';
import { ClothCreateMutation, ClothUpdateMutation } from '../mutations';

class OrderBulkUpdateDialog extends Component {
	state = {
		submitting: false
	}
	onComfirm = () => {
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
		const { handleClose, open } = this.props;
		const { submitting } = this.state;

		return (
      <Dialog title='Update Order' modal={false} open={open}
        actions={[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      submitting?<CircularProgress size={0.5}/>:
		      	<FlatButton label='Submit' disabled={submitting} primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose}>
		    <div className='flex flex-row'>
		    </div>
      </Dialog>
		);
	}
}

OrderBulkUpdateDialog.propTypes = {
	selectOrders: PropTypes.arrayOf(PropTypes.object),
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};

export default OrderBulkUpdateDialog;

