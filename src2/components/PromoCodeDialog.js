import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import CircularProgress from 'material-ui/CircularProgress';
import { InputBox } from '../widgets';
import { PromoTypeDropdownMenu } from '../components';
import { PromoCodeCreateMutation, PromoCodeUpdateMutation, PromoCodeDeleteMutation } from '../mutations';

class PromoCodeDialog extends Component {
	constructor(props) {
		super(props);
		this.state = this.onPropUpdate(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.promoCode !== this.props.promoCode) {
			this.setState(this.onPropUpdate(nextProps));
		}
	}
	onPropUpdate = (props) => {
		const code = props.promoCode;
		if (code) {
			return {
				enabled: code.enabled,
				promoType: code.promoType,
				multipleUse: code.multipleUse,
				mobileOnly: code.mobileOnly,
				firstTimeUser: code.firstTimeUser,
				startDate: new Date(code.start),
				endDate: new Date(code.end)
			};
		} else {
			return {
				enabled: true,
				promoType: 'flat',
				multipleUse: false,
				mobileOnly: false,
				firstTimeUser: false,
				startDate: undefined,
				endDate: undefined
			};
		}
	}
	onComfirm = () => {
		const promoCode = this.props.promoCode;
		const code = this.refs.code.getValue();
		const name = this.refs.name.getValue();
		const description = this.refs.description.getValue();
		const perUserLimit = this.refs.perUserLimit.getValue();
		const limit = this.refs.limit.getValue();
		const promoValue = this.refs.promoValue.getValue();
		const amount = this.refs.amount.getValue();
		const { enabled, promoType, multipleUse, mobileOnly, firstTimeUser, startDate, endDate } = this.state;

		if (!code || !name || !perUserLimit || !limit
			|| !promoValue || !amount || !promoType || !startDate || !endDate) {
			return;
		}

		const updates = {
			enabled,
			name,
			description,
			start: startDate,
			end: endDate,
			perUserLimit,
			limit,
			promoType,
			promoValue,
			amount,
			multipleUse,
			mobileOnly,
			firstTimeUser
		};

		let mutation;
		if (!promoCode) {
			mutation = new PromoCodeCreateMutation({
				viewer: this.props.viewer,
				code,
				...updates
			});
		} else {
			mutation = new PromoCodeUpdateMutation({
				id: promoCode.id,
				...updates
			});
		}

		Relay.Store.commitUpdate(mutation,
			{onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onDelete = () => {
		this.props.relay.commitUpdate(new PromoCodeDeleteMutation({
			viewer: this.props.viewer,
			id: this.props.promoCode.id
		}), {onSuccess: this.onSuccess, onFailure: this.onFailure});
	}
	onSuccess = () => {
		this.setState({submitting: false});
		this.props.handleClose();
	}
	onFailure = (transaction) => {
		this.setState({submitting: false});
	}
	onSelectPromoType = (promoType) => {
		this.setState({promoType});
	}
	onStartDateChange = (_, date) => {
		this.setState({startDate: date});
	}
	onEndDateChange = (_, date) => {
		this.setState({endDate: date});
	}
	onMultipleUseChange = (event, isInputChecked) => {
		this.setState({multipleUse: isInputChecked});
	}
	onMobileAppOnlyChange = (event, isInputChecked) => {
		this.setState({mobileOnly: isInputChecked});
	}
	onFisrtTimeUserChange = (event, isInputChecked) => {
		this.setState({firstTimeUser: isInputChecked});
	}
	onEnableToggle = () => {
		this.setState({enabled: !this.state.enabled});
	}
	render() {
		const { handleClose, open, promoCode } = this.props;
		const { enabled, promoType, multipleUse, mobileOnly, firstTimeUser, startDate, endDate } = this.state;

		return (
      <Dialog title={promoCode?`Edit Promo Code ${promoCode.code}`:'New Promo Code'} modal={false} open={open}
        actions={this.state.submitting?[<CircularProgress size={0.5}/>]:[
        	<FlatButton label='Delete' secondary={true} onTouchTap={this.onDelete}/>,
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      <FlatButton label='Submit' disabled={this.state.submitting} primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose} autoScrollBodyContent={true}>
			    <div className='flex padding-top'>
			    	<Toggle label='Enabled' toggled={enabled} onToggle={this.onEnableToggle}/>
						<InputBox ref='code' disabled={promoCode!==null} value={promoCode&&promoCode.code}
							floatingLabelText='Live empty to use autogenerate'/>
						<InputBox ref='name' value={promoCode&&promoCode.name} floatingLabelText='Name'
							verify='notempty' errorText='code name can not be empty'/>
						<InputBox ref='description' value={promoCode&&promoCode.description}
							floatingLabelText='Description'/>
						<DatePicker hintText='Start from' mode='landscape' defaultDate={startDate}
							onChange={this.onStartDateChange}/>
						<DatePicker hintText='End to' mode='landscape' defaultDate={endDate}
							onChange={this.onEndDateChange}/>
						<InputBox ref='perUserLimit' type='number' value={promoCode&&promoCode.perUserLimit}
							floatingLabelText='PerUser Limit'/>
						<InputBox ref='limit' type='number' value={promoCode&&promoCode.limit}
							floatingLabelText='User limit'/>
	        	<PromoTypeDropdownMenu select={promoType} onSelect={this.onSelectPromoType}/>
	        	<InputBox ref='promoValue' type='number' value={promoCode&&promoCode.promoValue}
	        		floatingLabelText={promoType==='Flat'?'Promo Value':'Discount Percentage'}/>
	        	<InputBox ref='amount' type='number' value={promoCode&&promoCode.amount}
							floatingLabelText='Total No. of Promo'/>
						<Checkbox label='Multiple Use' checked={multipleUse} onCheck={this.onMultipleUseChange}/>
						<Checkbox label='Mobile App Only' checked={mobileOnly} onCheck={this.onMobileAppOnlyChange}/>
						<Checkbox label='First Time User' checked={firstTimeUser} onCheck={this.onFisrtTimeUserChange}/>
	        </div>
      </Dialog>
		);
	}
}

PromoCodeDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	promoCode: PropTypes.object
};

export default Relay.createContainer(PromoCodeDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${PromoCodeCreateMutation.getFragment('viewer')}
				${PromoCodeDeleteMutation.getFragment('viewer')}
			}
		`
	}
});


