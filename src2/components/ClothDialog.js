import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import CategorySelectMenu from './CategorySelectMenu';
import { InputBox, DropZone, Toast } from '../widgets';
import { ClothCreateMutation, ClothUpdateMutation } from '../mutations';

class ClothDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submitting: false,
			selectedCategoryId: props.defaultCategoryId
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.clothId !== this.props.clothId) {
			this.props.relay.setVariables({id: nextProps.clothId||null});
		} else if (nextProps.defaultCategoryId !== this.props.defaultCategoryId) {
			this.setState({selectedCategoryId: nextProps.defaultCategoryId});
		} else if (nextProps.viewer !== this.props.viewer && nextProps.viewer.cloth) {
			this.setState({selectedCategoryId: nextProps.viewer.cloth.categoryId});
		}
	}
	onComfirm = () => {
		if (!this.state.selectedCategoryId) {
			return;
		}

		const nameEn = this.refs.nameEn.getValue();
		const nameCn = this.refs.nameCn.getValue();
		const washPrice = this.refs.washPrice.getValue();
		const ironPrice = this.refs.ironPrice.getValue();
		const dryCleanPrice = this.refs.dryCleanPrice.getValue();
		const discount = this.refs.discount.getValue();
		const file = this.refs.dropzone.getFile();

		const cloth = this.props.viewer.cloth;

		if (!nameEn || !nameCn || !washPrice || !ironPrice
			|| !dryCleanPrice || !discount) {
			return;
		} else if (!cloth&&!file) {
			return;
		}

		if (!cloth) {
			Relay.Store.commitUpdate(new ClothCreateMutation({
				viewer: this.props.viewer,
				categoryId: this.state.selectedCategoryId,
				file,
				nameEn,
				nameCn,
				washPrice,
				ironPrice,
				dryCleanPrice,
				washPriceDiscount: discount,
				ironPriceDiscount: discount,
				dryCleanPriceDiscount: discount
			}), {onSuccess: this.onSuccess, onFailure: this.onFailure});
		} else {
			let update = {};
			if (nameEn !== cloth.nameEn) {
				update.nameEn = nameEn;
			}
			if (nameCn !== cloth.nameCn) {
				update.nameCn = nameCn;
			}
			if (washPrice !== cloth.washPrice) {
				update.washPrice = washPrice;
			}
			if (ironPrice !== cloth.ironPrice) {
				update.ironPrice = ironPrice;
			}
			if (dryCleanPrice !== cloth.dryCleanPrice) {
				update.dryCleanPrice = dryCleanPrice;
			}
			if (discount !== cloth.washPriceDiscount) {
				update.washPriceDiscount = discount;
				update.ironPriceDiscount = discount;
				update.dryCleanPriceDiscount = discount;
			}

			if (!file && Object.keys(update).length === 0) {
				this.props.handleClose();
				return;
			}

			Relay.Store.commitUpdate(new ClothUpdateMutation({
				id: cloth.id,
				file,
				categoryId: this.state.selectedCategoryId,
				...update
			}), {onSuccess: this.onSuccess, onFailure: this.onFailure});
		}

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
		this.setState({selectedCategoryId: categoryId});
	}
	render() {
		const cloth = this.props.viewer.cloth;
		const { handleClose, open } = this.props;
		const { submitting, selectedCategoryId } = this.state;

		return (
      <Dialog title={cloth?`${cloth.nameEn} (${cloth.nameCn})`:'New Item'} modal={false} open={open}
        actions={submitting?[<CircularProgress size={0.5}/>]:[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		     	<FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose} autoScrollBodyContent={true}>
			    <div className='flex flex-row padding-top'>
				    <div className='flex margin-right'>
				    	<CategorySelectMenu connection={this.props.viewer.categories}
				    		selectId={selectedCategoryId} onSelect={this.onSelectCategory}/>
			        <InputBox ref='nameEn' value={cloth&&cloth.nameEn} floatingLabelText='English Name'
			        	verify='notempty' errorText='english name can not be empty'/>
			        <InputBox ref='nameCn' value={cloth&&cloth.nameEn} floatingLabelText='Chinese Name'
			        	verify='notempty' errorText='chinese name can not be empty'/>
			        <InputBox ref='washPrice' value={cloth&&cloth.washPrice} type='number' floatingLabelText='Wash Price'
			        	verify='price' errorText='price must greater than 0'/>
			        <InputBox ref='ironPrice' value={cloth&&cloth.ironPrice} type='number' floatingLabelText='Iron Price'
			        	verify='price' errorText='price must greater than 0'/>
			        <InputBox ref='dryCleanPrice' value={cloth&&cloth.dryCleanPrice} type='number' floatingLabelText='Dry Clean Price'
			        	verify='price' errorText='price must greater than 0'/>
			        <InputBox ref='discount' value={cloth&&cloth.washPriceDiscount} type='number' floatingLabelText='Discount, 1 ~ 100'
			        	verify={/^[1-9][0-9]?$|^100$/} errorText='discount must between 1 and 100'/>
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
					washPriceDiscount
					dryCleanPriceDiscount
					ironPriceDiscount
					special
					imageUrl
				}
				${ClothCreateMutation.getFragment('viewer')}
			}
		`
	}
});