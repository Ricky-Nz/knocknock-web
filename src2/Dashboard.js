import React, { Component, PropTypes } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconExit from 'material-ui/svg-icons/action/exit-to-app';
import IconShip from 'material-ui/svg-icons/maps/local-shipping';
import IconUser from 'material-ui/svg-icons/action/supervisor-account';
import { SearchBar } from './widgets';

export class Dashboard extends Component {
	onNavitage = (e, value) => {
		if (value !== this.props.location.pathname) {
			this.context.router.push({
				pathname: value,
				query: { limit: 10 }
			});
		}
	}
	logOut = () => {

	}
	render() {
		return (
			<div className='flex flex-fill'>
				<div className='flex flex-fill' style={styles.mainContainer}>
					{this.props.children}
				</div>
				<Drawer open={true}>
				  <Menu onChange={this.onNavitage} value={this.props.location.pathname}>
				    <MenuItem value='/dashboard/user/worker' leftIcon={<IconShip/>}>Workers</MenuItem>
				    <MenuItem value='/dashboard/user/client' leftIcon={<IconUser/>}>Users</MenuItem>
				    <MenuItem value='/dashboard/user/admin' leftIcon={<IconUser/>}>Orders</MenuItem>
				    <MenuItem value='/dashboard/product/laundry' leftIcon={<IconUser/>}>Clothes</MenuItem>
				 	</Menu>
				</Drawer>
			</div>
		);
	}
}

Dashboard.contextTypes = {
	router: PropTypes.object
};

const styles = {
	mainContainer: {
		marginLeft: 256
	}
};