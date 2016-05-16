import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { InputBox, DropZone } from '../widgets';
import { CreateClothMutation } from '../mutations';

class ClothEditDialog extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.selectId !== this.props.selectId) {
			this.props.relay.setVariables({id: nextProps.selectId});
		}
	}
	onComfirm = () => {
		const nameEn = this.refs.nameEn.getValue();
		const nameCn = this.refs.nameCn.getValue();
		const washPrice = this.refs.washPrice.getValue();
		const ironPrice = this.refs.ironPrice.getValue();
		const dryCleanPrice = this.refs.dryCleanPrice.getValue();
		const discount = this.refs.discount.getValue();

		Relay.Store.commitUpdate(new CreateClothMutation({
			nameEn,
			nameCn,
			washPrice,
			ironPrice,
			dryCleanPrice,
			washPriceDiscount: discount,
			ironPriceDiscount: discount,
			dryCleanPriceDiscount: discount
		}));
	}
	render() {
		const { handleClose, open, selectId, viewer } = this.props;

		return (
      <Dialog title={viewer.laundryCloth?viewer.laundryCloth.nameEn:'New Item'} modal={false} open={open}
        actions={[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      <FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose}>
		    <div className='flex flex-row'>
			    <div className='flex margin-right'>
		        <InputBox ref='nameEn' floatingLabelText='English Name'
		        	verify='notempty' message='english name can not be empty'/>
		        <InputBox ref='nameCn' floatingLabelText='Chinese Name'
		        	verify='notempty' message='chinese name can not be empty'/>
		        <InputBox ref='washPrice' type='number' floatingLabelText='Wash Price'/>
		        <InputBox ref='ironPrice' type='number' floatingLabelText='Iron Price'/>
		        <InputBox ref='dryCleanPrice' type='number' floatingLabelText='Dry Clean Price'/>
		        <InputBox ref='discount' type='number' floatingLabelText='Discount'/>
	        </div>
	        <DropZone className='flex flex-fill' multiple={false} accept='image/*'/>
        </div>
      </Dialog>
		);
	}
}

ClothEditDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectId: PropTypes.string
};

export default Relay.createContainer(ClothEditDialog, {
	initialVariables: {
		id: null
	},
	prepareVariables: (prevVariables) => {
		return {
			...prevVariables,
			skipLoad: !prevVariables.id
		};
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				laundryCloth(id: $id) @skip(if: $skipLoad) {
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
			}
		`
	}
});