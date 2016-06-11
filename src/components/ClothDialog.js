import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import CategorySelectMenu from './CategorySelectMenu';
import { InputBox, DropZone, Toast } from '../widgets';
import { ClothCreateMutation, ClothUpdateMutation, ClothDeleteMutation } from '../mutations';

class ClothDialog extends Component {
	constructor(props) {
		super(props);
		this.state = this.onUpdateState(props)
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.clothId !== this.props.clothId) {
			this.props.relay.setVariables({id: nextProps.clothId||null});
		}
		this.setState(this.onUpdateState(nextProps));
	}
	onUpdateState(props) {
		const cloth = props.viewer.cloth;
		return {
			submitting: false,
			categoryId: (cloth&&cloth.categoryId)||props.defaultCategoryId,
			enableWashPriceDiscount: cloth&&cloth.enableWashPriceDiscount||false,
			enableDryCleanPriceDiscount: cloth&&cloth.enableDryCleanPriceDiscount||false,
			enableIronPriceDiscount: cloth&&cloth.enableIronPriceDiscount||false,
			special: cloth&&cloth.special||false,
			hideFromUser: cloth&&cloth.hideFromUser||false,
			enabled: cloth&&cloth.hideFromUser||true
		};
	}
	onComfirm = () => {
		const cloth = this.props.viewer.cloth;
		const nameEn = this.refs.nameEn.getValue();
		const nameCn = this.refs.nameCn.getValue();
		const washPrice = this.refs.washPrice.getValue();
		const ironPrice = this.refs.ironPrice.getValue();
		const dryCleanPrice = this.refs.dryCleanPrice.getValue();
		const discountWashPrice = this.refs.discountWashPrice.getValue();
		const discountDryCleanPrice = this.refs.discountDryCleanPrice.getValue();
		const discountIronPrice = this.refs.discountIronPrice.getValue();
		const file = this.refs.dropzone.getFile();
		const { categoryId, enableWashPriceDiscount, enableDryCleanPriceDiscount,
			enableIronPriceDiscount, special, hideFromUser, enabled } = this.state;

		if (!nameEn || !nameCn || !categoryId || (!cloth&&!file)) {
			return;
		}

		const updates = {
			categoryId,
			file,
			nameEn,
			nameCn,
			washPrice,
			ironPrice,
			dryCleanPrice,
			discountWashPrice,
			discountDryCleanPrice,
			discountIronPrice,
			enableWashPriceDiscount,
			enableDryCleanPriceDiscount,
			enableIronPriceDiscount,
			special,
			hideFromUser,
			enabled
		};

		if (!cloth) {
			Relay.Store.commitUpdate(new ClothCreateMutation({
				viewer: this.props.viewer,
				...updates
			}), {onSuccess: this.onSuccess, onFailure: this.onFailure});
		} else {
			Relay.Store.commitUpdate(new ClothUpdateMutation({
				id: cloth.id,
				...updates
			}), {onSuccess: this.onSuccess, onFailure: this.onFailure});
		}

		this.setState({submitting: true});
	}
	onDelete = () => {
		this.props.relay.commitUpdate(new ClothDeleteMutation({
			viewer: this.props.viewer,
			id: this.props.clothId
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
	onSelectCategory = (categoryId) => {
		this.setState({categoryId});
	}
	onToggleEnableWashPrice = () => {
		this.setState({enableWashPriceDiscount: !this.state.enableWashPriceDiscount});
	}
	onToggleEnableDryCleanPrice = () => {
		this.setState({enableDryCleanPriceDiscount: !this.state.enableDryCleanPriceDiscount});
	}
	onToggleEnableIronPrice = () => {
		this.setState({enableIronPriceDiscount: !this.state.enableIronPriceDiscount});
	}
	onToggleSpecial = () => {
		this.setState({special: !this.state.special});
	}
	onToggleHideFromUser = () => {
		this.setState({hideFromUser: !this.state.hideFromUser});
	}
	onToggleEnabled = () => {
		this.setState({enabled: !this.state.enabled});
	}
	render() {
		const cloth = this.props.viewer.cloth;
		const { handleClose, open, clothId } = this.props;
		const { submitting, categoryId, enableWashPriceDiscount, enableDryCleanPriceDiscount,
			enableIronPriceDiscount, special, hideFromUser, enabled } = this.state;

		let actions = [
			<FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
			<FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		];

		if (clothId) {
			actions.splice(0, 0, <FlatButton label='Delete' secondary={true} onTouchTap={this.onDelete}/>);
		}

		return (
      <Dialog title={cloth?`${cloth.nameEn} (${cloth.nameCn})`:'New Item'} modal={false} open={open}
        actions={submitting?[<CircularProgress size={0.5}/>]:actions} onRequestClose={handleClose} autoScrollBodyContent={true}>
			    <div className='flex flex-row flex-align-start padding-top'>
				    <div className='flex margin-right'>
				    	<CategorySelectMenu connection={this.props.viewer.categories}
				    		selectId={categoryId} onSelect={this.onSelectCategory}/>
			        <InputBox ref='nameEn' value={cloth&&cloth.nameEn} floatingLabelText='English Name'
			        	verify='notempty' errorText='english name can not be empty'/>
			        <InputBox ref='nameCn' value={cloth&&cloth.nameCn} floatingLabelText='Chinese Name'
			        	verify='notempty' errorText='chinese name can not be empty'/>
			        <InputBox ref='washPrice' value={cloth&&cloth.washPrice} type='number' floatingLabelText='Wash&Iron Price'/>
			        <InputBox ref='dryCleanPrice' value={cloth&&cloth.dryCleanPrice} type='number' floatingLabelText='Dry Clean Price'/>
			        <InputBox ref='ironPrice' value={cloth&&cloth.ironPrice} type='number' floatingLabelText='Iron Price'/>
		        	<InputBox ref='discountWashPrice' value={cloth&&cloth.discountWashPrice} type='number' floatingLabelText='Discount Wash&Iron Price'/>
		        	<Toggle label='Enabled' toggled={enableWashPriceDiscount} onToggle={this.onToggleEnableWashPrice}/>
			        <InputBox ref='discountDryCleanPrice' value={cloth&&cloth.discountDryCleanPrice} type='number' floatingLabelText='Discount Dry Clean Price'/>
							<Toggle label='Enabled' toggled={enableDryCleanPriceDiscount} onToggle={this.onToggleEnableDryCleanPrice}/>
			        <InputBox ref='discountIronPrice' value={cloth&&cloth.discountIronPrice} type='number' floatingLabelText='Discount Iron Price'/>
							<Toggle label='Enabled' toggled={enableIronPriceDiscount} onToggle={this.onToggleEnableIronPrice}/>
							<Subheader>Controls</Subheader>
							<Checkbox label='Special item' checked={special} onCheck={this.onToggleSpecial}/>
							<Checkbox label='Hide from user' checked={hideFromUser} onCheck={this.onToggleHideFromUser}/>
							<Checkbox label='Enabled' checked={enabled} onCheck={this.onToggleEnabled}/>
		        </div>
		        <DropZone ref='dropzone' className='flex flex-fill'
		        	required imageUrl={cloth&&cloth.imageUrl} multiple={false} accept='image/*'/>
	        </div>
      </Dialog>
		);
	}
}

ClothDialog.propTypes = {
	defaultCategoryId: PropTypes.string,
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	clothId: PropTypes.string 
};

export default Relay.createContainer(ClothDialog, {
	initialVariables: {
		id: null,
		fetchCloth: false
	},
	prepareVariables: (preVariables) => {
		return {
			...preVariables,
			fetchCloth: preVariables.id !== null
		};
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				categories(first: 1000) {
					${CategorySelectMenu.getFragment('connection')}
				}
				cloth(id: $id) @include(if: $fetchCloth) {
					id
					categoryId
					nameCn
					nameEn
					washPrice
					dryCleanPrice
					ironPrice
					discountWashPrice
					discountDryCleanPrice
					discountIronPrice
					enableWashPriceDiscount
					enableDryCleanPriceDiscount
					enableIronPriceDiscount
					special
					hideFromUser
					enabled
					imageUrl
				}
				${ClothCreateMutation.getFragment('viewer')}
				${ClothDeleteMutation.getFragment('viewer')}
			}
		`
	}
});