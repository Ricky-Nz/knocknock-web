import React, { Component, PropTypes } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconExit from 'material-ui/svg-icons/action/exit-to-app';
import IconShip from 'material-ui/svg-icons/maps/local-shipping';
import IconUser from 'material-ui/svg-icons/action/supervisor-account';

class DashboardDrawer extends Component {
	onNavitage = (e, value) => {
		if (value !== this.props.location.pathname) {
			this.context.router.replace(value);
		}
	}
	render() {
		const { logOut, location } = this.props;

		return (
			<Drawer open={true}>
				<AppBar title='Title'
			  	iconElementRight={<IconButton onClick={logOut}><IconExit/></IconButton>}/>
			  <Menu onChange={this.onNavitage} value={location.pathname}>
			    <MenuItem value='/dashboard/browser/worker' leftIcon={<IconShip/>}>Workers</MenuItem>
			    <MenuItem value='/dashboard/browser/client' leftIcon={<IconUser/>}>Users</MenuItem>
			    <MenuItem value='/dashboard/browser/order' leftIcon={<IconUser/>}>Orders</MenuItem>
			 	</Menu>
			</Drawer>
		);
	}
}

DashboardDrawer.propTypes = {
	logOut: PropTypes.func.isRequired
};

DashboardDrawer.contextTypes = {
	router: PropTypes.object
};

export default DashboardDrawer;