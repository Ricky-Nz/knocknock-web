import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { InputBox, DropZone, Toast } from '../widgets';
import { CreateCategoryMutation, UpdateCategoryMutation } from '../mutations';

class CategoryDialog extends Component {
	state = {
		submitting: false
	}
	onComfirm = () => {
		const nameEn = this.refs.nameEn.getValue();
		const nameCn = this.refs.nameCn.getValue();
		const category = this.props.category;

		if (!nameEn || !nameCn) {
			return;
		}

		let mutation;
		if (!category) {
			mutation = new CreateCategoryMutation({
				viewer: this.props.viewer,
				nameEn,
				nameCn
			});
		} else {
			let update = {};
			if (nameEn !== category.nameEn) {
				update.nameEn = nameEn;
			}
			if (nameCn !== category.nameCn) {
				update.nameCn = nameCn;
			}

			if (Object.keys(update).length === 0) {
				return this.props.handleClose();
			}

			mutation = new UpdateCategoryMutation({
				id: category.id,
				...update
			});
		}

		Relay.Store.commitUpdate(mutation,
			{onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onSuccess = () => {
		this.setState({submitting: false});
		this.props.handleClose();
	}
	onFailure = (transaction) => {
		this.setState({submitting: false});
	  var error = transaction.getError() || new Error('Mutation failed.');
		console.log(error);
	}
	render() {
		const { handleClose, open, category } = this.props;

		return (
      <Dialog title={category?category.nameEn:'New Category'} modal={false} open={open}
        actions={[
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      this.state.submitting?<CircularProgress size={0.5}/>:<FlatButton label='Submit' disabled={this.state.submitting} primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose}>
			    <div className='flex'>
		        <InputBox ref='nameEn' value={category&&category.nameEn} floatingLabelText='English Name'
		        	verify='notempty' errorText='english name can not be empty'/>
		        <InputBox ref='nameCn' value={category&&category.nameEn} floatingLabelText='Chinese Name'
		        	verify='notempty' errorText='chinese name can not be empty'/>
	        </div>
      </Dialog>
		);
	}
}

CategoryDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	category: PropTypes.object
};

export default Relay.createContainer(CategoryDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${CreateCategoryMutation.getFragment('viewer')}
			}
		`
	}
});

