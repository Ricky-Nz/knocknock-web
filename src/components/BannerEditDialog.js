import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { InputBox, DropZone, Toast } from '../widgets';
import { CreateBannerMutation, UpdateBannerMutation, DeleteBannerMutation } from '../mutations';

class BannerEditDialog extends Component {
	constructor(props) {
		super(props);
		this.state = this.onPropUpdate(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.banner !== this.props.banner) {
			this.setState(this.onPropUpdate(nextProps));
		}
	}
	onPropUpdate = (props) => {
		const banner = props.banner;
		if (banner) {
			return {
				enabled: banner.enabled
			};
		} else {
			return {
				enabled: true
			};
		}
	}
	onComfirm = () => {
		const banner = this.props.banner; 
		const title = this.refs.title.getValue();
		const link = this.refs.link.getValue();
		const position = this.refs.position.getValue();
		const file = this.refs.dropzone.getFile();
		const { enabled } = this.state;

		if (!title) {
			return;
		}

		const updates = {
			file,
			enabled,
			title,
			link,
			position
		};

		let mutation;
		if (!banner) {
			if (!file) {
				return;
			}

			mutation = new CreateBannerMutation({
				viewer: this.props.viewer,
				...updates
			});
		} else {
			mutation = new UpdateBannerMutation({
				id: banner.id,
				...updates
			});
		}

		this.props.relay.commitUpdate(mutation,
			{onSuccess: this.onSuccess, onFailure: this.onFailure});
		this.setState({submitting: true});
	}
	onDelete = () => {
		this.props.relay.commitUpdate(new DeleteBannerMutation({
			viewer: this.props.viewer,
			id: this.props.banner.id
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
	onEnableToggle = () => {
		this.setState({enabled: !this.state.enabled});
	}
	render() {
		const { handleClose, open, banner } = this.props;
		const { enabled } = this.state;

		return (
      <Dialog title={banner?'Edit Banner':'New Banner'} modal={false} open={open}
        actions={this.state.submitting?[<CircularProgress size={0.5}/>]:[
        	<FlatButton label='Delete' secondary={true} onTouchTap={this.onDelete}/>,
		      <FlatButton label='Cancel' primary={true} onTouchTap={handleClose}/>,
		      <FlatButton label='Submit' primary={true} onTouchTap={this.onComfirm}/>
		    ]} onRequestClose={handleClose} autoScrollBodyContent={true}>
		    <div className='flex padding-top'>
	        <DropZone ref='dropzone' style={styles.dropzone}
	        	required imageUrl={banner&&banner.imageUrl} multiple={false} accept='image/*'/>
	        <InputBox ref='title' value={banner&&banner.title} floatingLabelText='Title'
	        	verify='notempty' errorText='title can not be empty'/>
	        <InputBox ref='link' value={banner&&banner.link} floatingLabelText='Link'/>
	        <InputBox ref='position' type='number' value={banner&&banner.position} floatingLabelText='Order'/>
	        <br/>
	        <Toggle label='Enabled' toggled={enabled} onToggle={this.onEnableToggle}/>
	       </div>
      </Dialog>
		);
	}
}

BannerEditDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	banner: PropTypes.object
};

const styles = {
	dropzone: {
		height: 150
	}
};

export default Relay.createContainer(BannerEditDialog, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${CreateBannerMutation.getFragment('viewer')}
				${DeleteBannerMutation.getFragment('viewer')}
			}
		`
	}
});

