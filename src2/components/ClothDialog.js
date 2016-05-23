import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import CategorySelectMenu from './CategorySelectMenu';
import { InputBox, DropZone, Toast } from '../widgets';
import { CreateClothMutation, UpdateClothMutation } from '../mutations';

class ClothDialog extends Component {
	state = {
		submitting: false,
		selectedCagetoryId: null
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.clothId !== this.props.clothId) {
			this.props.relay.setVariables({id: nextProps.clothId||null});
		}
	}
	onComfirm = () => {
		if (!this.state.selectedCagetoryId) {
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
			Relay.Store.commitUpdate(new CreateClothMutation({
				viewer: this.props.viewer,
				categoryId: this.state.selectedCagetoryId,
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

			Relay.Store.commitUpdate(new UpdateClothMutation({
				id: cloth.id,
				file,
				categoryId: this.state.selectedCagetoryId,
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
	  var error = transaction.getError() || new Error('Mutation failed.');
	  this.refs.toast.show(JSON.stringify(error));
	}
	onSelectCategory = (categoryId) => {
		this.setState({selectedCagetoryId: categoryId});
	}
	render() {
		const cloth = this.props.viewer.cloth;
		const { handleClose, open } = this.props;
		const { submitting, selectedCagetoryId } = this.state;

		return (
      <Dialog title={cloth?`${cloth.nameEn} (${cloth.nameCn})`:'New Item'} modal={false} open={open}
        actions={[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      submitting?<CircularProgress size={0.5}/>:<FlatButton label='Submit' disabled={this.state.submitting} primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose}>
			    <div className='flex flex-row flex-fill scroll'>
				    <div className='flex margin-right'>
				    	<CategorySelectMenu connection={this.props.viewer.categories}
				    		selectId={selectedCagetoryId} onSelect={this.onSelectCategory}/>
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
	        <Toast ref='toast'/>
      </Dialog>
		);
	}
}

ClothDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	clothId: PropTypes.string 
};

export default Relay.createContainer(ClothDialog, {
	initialVariables: {
		id: null
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
				${CreateClothMutation.getFragment('viewer')}
			}
		`
	}
});