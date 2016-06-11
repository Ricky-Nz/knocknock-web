import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import CircularProgress from 'material-ui/CircularProgress';
import { InputBox } from '../widgets';
import { CreateVoucherMutation, UpdateVoucherMutation, DeleteVoucherMutation } from '../mutations';

class VoucherDialog extends Component {
	constructor(props) {
		super(props);
		this.state = this.onUpdateState(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.voucherId !== this.props.voucherId) {
			this.props.relay.setVariables({voucherId: nextProps.voucherId||null});
		}

		if (nextProps.viewer.voucher !== this.props.viewer.voucher) {
			this.setState(this.onUpdateState(nextProps));
		}
	}
	onUpdateState(props) {
		const voucher = props.viewer.voucher;
		if (voucher) {
			return {
				enabled: voucher.enabled,
				expireOn: new Date(voucher.expireOn)
			};
		} else {
			return {
				enabled: true,
				expireOn: new Date()
			};
		}
	}
	onComfirm = () => {
		const voucher = this.props.viewer.voucher;
		const title = this.refs.title.getValue();
		const value = this.refs.value.getValue();
		const { expireOn, enabled } = this.state;

		if (!title || !expireOn || !value) {
			return;
		}

		const updates = {
			title,
			value,
			expireOn,
			enabled
		};

		let mutation;
		if (!voucher) {
			mutation = new CreateVoucherMutation({
				viewer: this.props.viewer,
				...updates
			});
		} else {
			mutation = new UpdateVoucherMutation({
				voucher,
				...updates
			});
		}

		Relay.Store.commitUpdate(mutation,
			{onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onDelete = () => {
    this.props.relay.commitUpdate(new DeleteVoucherMutation({
    	viewer: this.props.viewer,
    	voucher: this.props.viewer.voucher
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
	onSelectDate = (_, date) => {
		this.setState({expireOn: date});
	}
	onToggleEnable = () => {
		this.setState({enabled: !this.state.enabled});
	}
	render() {
		const { handleClose, open } = this.props;
		const voucher = this.props.viewer.voucher;
		const { enabled, submitting, expireOn } = this.state;

		let actions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
      <FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		];
		
		if (voucher) {
			actions.splice(0, 0, <FlatButton label='Delete' secondary={true} onTouchTap={this.onDelete}/>);
		}

		return (
      <Dialog title={voucher?'Edit Voucher':'New Voucher'} modal={false} open={open}
        actions={submitting?[<CircularProgress size={0.5}/>]:actions}
        onRequestClose={handleClose} autoScrollBodyContent={true}>
			    <div className='flex'>
						<InputBox ref='title' value={voucher&&voucher.title} floatingLabelText='Title'
							verify='notempty' errorText='voucher title can not be empty'/>
						<InputBox ref='value' value={voucher&&voucher.value} floatingLabelText='Value' type='number'/>
						<DatePicker hintText='Expire Date' mode='landscape' onChange={this.onSelectDate} value={expireOn}/>
						<br/>
						<Toggle label='Enabled' toggled={enabled} onToggle={this.onToggleEnable}/>
	        </div>
      </Dialog>
		);
	}
}

VoucherDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	voucherId: PropTypes.string
};

export default Relay.createContainer(VoucherDialog, {
	initialVariables: {
		voucherId: null,
		skipFetch: true
	},
	prepareVariables: (variables) => ({
		...variables,
		skipFetch: !variables.voucherId
	}),
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				voucher(id:$voucherId) @skip (if: $skipFetch) {
					title
					value
					expireOn
					enabled
					${UpdateVoucherMutation.getFragment('voucher')}
					${DeleteVoucherMutation.getFragment('voucher')}
				}
				${CreateVoucherMutation.getFragment('viewer')}
				${DeleteVoucherMutation.getFragment('viewer')}
			}
		`
	}
});


