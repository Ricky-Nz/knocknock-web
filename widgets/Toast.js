import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

class Toast extends Component {
	constructor(props) {
		super(props);
		this.state = { show: false };
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.toast !== this.props.toast) {
			this.setState({show: true});
		}
	}
	onDismiss = () => {
		this.setState({show: false});
	}
	render() {
		const toast = this.props.toast;

		return (
      <Snackbar open={this.state.show} message={(toast&&toast.message)||''}
        autoHideDuration={2500} onRequestClose={this.onDismiss}/>
		);
	}
}

Toast.propTypes = {
	toast: PropTypes.object
};

const styles = {
	success: {
		color: 'green'
	},
	failed: {
		color: 'red'
	}
}

export default Toast;
