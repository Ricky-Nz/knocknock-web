import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { InputBox, DropZone, Toast } from '../widgets';
import { CreateClothMutation } from '../mutations';

class ClothDialog extends Component {
	state = {
		submitting: false
	}
	onComfirm = () => {
		const nameEn = this.refs.nameEn.getValue();
		const nameCn = this.refs.nameCn.getValue();
		const washPrice = this.refs.washPrice.getValue();
		const ironPrice = this.refs.ironPrice.getValue();
		const dryCleanPrice = this.refs.dryCleanPrice.getValue();
		const discount = this.refs.discount.getValue();
		const file = this.refs.dropzone.getFile();

		if (!nameEn || !nameCn || !washPrice || !ironPrice
			|| !dryCleanPrice || !discount || !file) {
			return;
		}

		Relay.Store.commitUpdate(new CreateClothMutation({
			clothPage: this.props.clothPage,
			file,
			nameEn,
			nameCn,
			washPrice,
			ironPrice,
			dryCleanPrice,
			washPriceDiscount: discount,
			ironPriceDiscount: discount,
			dryCleanPriceDiscount: discount,
			limit: 10
		}), {onSuccess: this.onSuccess, onFailure: this.onFailure});
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
	componentWillReceiveProps(nextProps) {
		if (nextProps.selectId !== this.props.selectId) {
			this.props.relay.setVariables({id: nextProps.selectId});
		}
	}
	render() {
		const { handleClose, open, selectId, viewer } = this.props;

		return (
      <Dialog title={viewer.laundryCloth?viewer.laundryCloth.nameEn:'New Item'} modal={false} open={open}
        actions={[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      this.state.submitting?<CircularProgress size={0.5}/>:<FlatButton label='Submit' disabled={this.state.submitting} primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose}>
			    <div className='flex flex-row'>
				    <div className='flex margin-right'>
			        <InputBox ref='nameEn' floatingLabelText='English Name'
			        	verify='notempty' errorText='english name can not be empty'/>
			        <InputBox ref='nameCn' floatingLabelText='Chinese Name'
			        	verify='notempty' errorText='chinese name can not be empty'/>
			        <InputBox ref='washPrice' type='number' floatingLabelText='Wash Price'
			        	verify='price' errorText='price must greater than 0'/>
			        <InputBox ref='ironPrice' type='number' floatingLabelText='Iron Price'
			        	verify='price' errorText='price must greater than 0'/>
			        <InputBox ref='dryCleanPrice' type='number' floatingLabelText='Dry Clean Price'
			        	verify='price' errorText='price must greater than 0'/>
			        <InputBox ref='discount' type='number' floatingLabelText='Discount, 1 ~ 100'
			        	verify={/^[1-9][0-9]?$|^100$/} errorText='discount must between 1 and 100'/>
		        </div>
		        <DropZone ref='dropzone' className='flex flex-fill' required multiple={false} accept='image/*'/>
	        </div>
	        <Toast ref='toast'/>
      </Dialog>
		);
	}
}

ClothDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectId: PropTypes.string
};

export default Relay.createContainer(ClothDialog, {
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
				cloth(id: $id) @skip(if: $skipLoad) {
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
		`,
		clothPage: () => Relay.QL`
			fragment on ClothPagination {
				${CreateClothMutation.getFragment('clothPage')}
			}
		`
	}
});