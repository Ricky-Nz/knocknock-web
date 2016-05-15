import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { InputBox, DropZone } from '../widgets';

class ClothEditDialog extends Component {
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
		      <FlatButton label='Submit' primary={true} onTouchTap={handleClose}/>
		    ]} onRequestClose={handleClose}>
		    <div className='flex flex-row'>
			    <div className='flex margin-right'>
		        <InputBox ref='nameEn' floatingLabelText='English Name'/>
		        <InputBox ref='nameCn' floatingLabelText='Chinese Name'/>
		        <InputBox ref='washPrice' floatingLabelText='Wash Price'/>
		        <InputBox ref='ironPrice' floatingLabelText='Iron Price'/>
		        <InputBox ref='dryCleanPrice' floatingLabelText='Dry Clean Price'/>
		        <InputBox ref='discount' floatingLabelText='Discount'/>
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