import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

class Toast extends Component {
	state = { show: false }
	onDismiss = () => {
		this.setState({show: false});
	}
	show(message) {
		this.setState({
			message,
			show: true
		});
	}
	render() {
		return (
      <Snackbar open={this.state.show} message={this.state.message||''}
        autoHideDuration={2500} onRequestClose={this.onDismiss}/>
		);
	}
}

export default Toast;
