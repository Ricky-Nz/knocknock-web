import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

class OrderActionbar extends Component {
	render() {
		return (
			<Paper className='flex flex-row'>
				<FlatButton label='Edit' primary={true}/>
			</Paper>
		);
	}
}

export default OrderActionbar;