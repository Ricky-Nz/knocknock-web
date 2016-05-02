import React, { Component, PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import IconDone from 'material-ui/svg-icons/action/done';
import IconClose from 'material-ui/svg-icons/navigation/close';
import { InputBox, AvatarEditor } from '../../widgets';

class CreateEditWorkerPage extends Component {
	componentDidMount() {
		if (this.props.params.id) {
			this.props.getWorkerById(this.props.params.id);
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.uploading&&this.props.uploading) {
			this.submitData(nextProps.uploadedFile);
		} else if (this.props.processing&&!nextProps.processing&&nextProps.processSuccess) {
			this.context.router.goBack();
		} else if (nextProps.params.id !== this.props.params.id) {
			this.props.getWorkerById(nextProps.params.id);
		}
	}
	onPasswordChange = (text) => {
		this.setState({password: text});
	}
	onSubmit = () => {
		const email = this.refs.email.getValue();
		const password = this.refs.password.getValue();
		const confirmPassword = this.refs.confirmPassword.getValue();
		const name = this.refs.name.getValue();
		const contact = this.refs.contact.getValue();

		if (!email || !password || !confirmPassword || !name || !contact) {
			return;
		}

		const avatarFile = this.refs.avatar.getFile();
		if (avatarFile) {
			this.props.uploadFile(avatarFile);
		} else {
			this.submitData();
		}
	}
	submitData = (avatarUrl) => {
		const email = this.refs.email.getValue();
		const password = this.refs.password.getValue();
		const confirmPassword = this.refs.confirmPassword.getValue();
		const name = this.refs.name.getValue();
		const contact = this.refs.contact.getValue();

		if (!email || !password || !confirmPassword || !name || !contact) {
			return;
		}

		this.props.createWorker({
			email,
			password,
			name,
			contact,
			avatarUrl
		});
	}
	render() {
		return (
			<div className='flex flex-fill padding position-relative'>
				<IconButton onClick={this.context.router.goBack}>
					<IconClose/>
				</IconButton>
				<br/>
				<Paper className='flex padding scroll' style={styles.container}>
					<Subheader>CREATE NEW WORKER</Subheader>
					<AvatarEditor ref='avatar'/>
					<InputBox ref='email' floatingLabelText='Email'
						verify='email' errorText='invalid email address'/>
					<InputBox ref='password' floatingLabelText='Password' type='password' onChange={this.onPasswordChange}
						verify='notempty' errorText='password can not be empty'/>
					<InputBox ref='confirmPassword' floatingLabelText='Confirm Password' type='password'
						verify={this.state&&this.state.password} errorText='password not match'/>
					<InputBox ref='name' floatingLabelText='Name'
						verify='notempty' errorText='name can not be empty'/>
					<InputBox ref='contact' floatingLabelText='Contact Number'
						verify='phonenumber' errorText='invalid Singapore phone number'/>
				</Paper>
			  <FloatingActionButton style={styles.floatButton} onClick={this.onSubmit}>
			    <IconDone/>
			  </FloatingActionButton>
			</div>
		);
	}
}

CreateEditWorkerPage.propTypes = {
	uploadedFile: PropTypes.string,
	uploading: PropTypes.bool,
	processing: PropTypes.bool,
	processSuccess: PropTypes.bool,
	getWorkerById: PropTypes.func.isRequired,
	uploadFile: PropTypes.func.isRequired,
	createWorker: PropTypes.func.isRequired
};

CreateEditWorkerPage.contextTypes = {
	router: PropTypes.object
};

const styles = {
	container: {
		margin: '0 auto'
	},
	floatButton: {
		position: 'absolute',
		right: 48,
		bottom: 48
	}
};

export default CreateEditWorkerPage;