import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { InputBox, DropZone, Toast } from '../widgets';
import { CategoryCreateMutation, CategoryUpdateMutation, CategoryDeleteMutation } from '../mutations';

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
			mutation = new CategoryCreateMutation({
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

			mutation = new CategoryUpdateMutation({
				id: category.id,
				...update
			});
		}

		this.props.relay.commitUpdate(mutation,
			{onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onDelete = () => {
		this.props.relay.commitUpdate(new CategoryDeleteMutation({
			viewer: this.props.viewer,
			id: this.props.category.id
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
	render() {
		const { handleClose, open, category } = this.props;

		let actions = [
      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
      <FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		];

		if (category) {
			actions.splice(0, 0, <FlatButton label='Delete' secondary={true} onTouchTap={this.onDelete}/>);
		}

		return (
      <Dialog title={category?category.nameEn:'New Category'} modal={false} open={open}
        actions={this.state.submitting?[<CircularProgress size={0.5}/>]:actions} onRequestClose={handleClose}>
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
				${CategoryCreateMutation.getFragment('viewer')}
				${CategoryDeleteMutation.getFragment('viewer')}
			}
		`
	}
});

