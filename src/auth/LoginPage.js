import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import { InputBox } from '../../widgets';

class LoginPage extends Component {
	componentWillMount() {
		this.onCheckToken(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.onCheckToken(nextProps);
	}
	onCheckToken = (props) => {
		if (props.token) {
			this.context.router.replace('/dashboard');
		}
	}
	onSubmit = () => {
		const username = this.refs.username.getValue();
		const password = this.refs.password.getValue();
		if (!username || !password) {
			return;
		}

		this.props.logIn({username, password});
	}
	render() {
		return (
			<div style={styles.container}>
				<Subheader style={styles.title}>
					Knocknock Backend Manage System
				</Subheader>
				<br/>
				<br/>
				<Paper className='flex padding' style={styles.inputContainer}>
					<InputBox ref='username' floatingLabelText='Email' fullWidth={true}
						value='knocknock@knocknockapp.com' verify='email' errorText='email address not vaild'/>
					<InputBox ref='password' floatingLabelText='Password' type='password' fullWidth={true}
						value='12345678' verify='notempty' errorText='password can not be empty'/>
					<br/>
					<div className='flex flex-row flex-end'>
						<RaisedButton label='login' primary={true} onClick={this.onSubmit}/>
					</div>
				</Paper>
			</div>
		);
	}
}

const styles = {
	container: {
		paddingTop: 200
	},
	inputContainer: {		
		width: 400,
		margin: '0 auto'
	},
	title: {
		textAlign: 'center',
		fontSize: '1.5em'
	}
};

LoginPage.propTypes = {
	token: PropTypes.string,
	logIn: PropTypes.func.isRequired
};

LoginPage.contextTypes = {
	router: PropTypes.object
};

export default LoginPage;