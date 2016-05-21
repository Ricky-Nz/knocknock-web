import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class InputBox extends Component {
	constructor(props) {
		super(props);
		this.state = {showError: false, value: props.value||''};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.value!==this.props.value) {
			this.setState({value: nextProps.value||''});
		}
	}
	onFocus = () => {
		if (this.state.showError) {
			this.setState({showError: false});
		}
	}
	onChange = (event) => {
		this.setState({value: event.target.value});
		this.props.onChange&&this.props.onChange(event.target.value);
	}
	getValue = () => {
		if (this.props.verify) {
			let verify = this.props.verify;
			switch (verify) {
				case 'price': verify = /^[1-9][0-9]*$/; break;
				case 'postalcode': verify = /^[0-9]{6,6}$/; break;
				case 'notempty': verify = /^(?!\s*$).+/; break;
				case 'phonenumber': verify = /^[0-9]{8,8}$/; break;
				case 'password': verify = /^\w{8,}$/; break;
				case 'email': verify = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; break;
			}
			
			if (!this.state.value.toString().match(verify)) {
				this.setState({showError: true});
				return null;
			}
		}

		return this.state.value;
	}
	render() {
		const { verify, errorText, ...props } = this.props;
		const { value, showError } = this.state;

		return (
			<TextField {...props} errorText={(verify&&showError)?errorText:null} value={value}
				onFocus={verify?this.onFocus:null} onBlur={verify?this.getValue:null} onChange={this.onChange}/>
		);
	}
}

InputBox.propTypes = {
	verify: PropTypes.any
};

export default InputBox;