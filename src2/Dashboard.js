import React, { Component, PropTypes } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconExit from 'material-ui/svg-icons/action/exit-to-app';
import IconShip from 'material-ui/svg-icons/maps/local-shipping';
import IconUser from 'material-ui/svg-icons/action/supervisor-account';
import IconTimer from 'material-ui/svg-icons/device/access-alarm';
import IconStore from 'material-ui/svg-icons/action/store';
import IconOrder from 'material-ui/svg-icons/notification/event-note';
import { SearchBar } from './widgets';

class Dashboard extends Component {
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
				    <MenuItem value='/dashboard/user/client' leftIcon={<IconUser/>}>Users</MenuItem>
				    <MenuItem value='/dashboard/orders' leftIcon={<IconOrder/>}>Orders</MenuItem>
				    <MenuItem value='/dashboard/product/laundry' leftIcon={<IconStore/>}>Clothes</MenuItem>
				    <MenuItem value='/dashboard/timeslots' leftIcon={<IconTimer/>}>Time Slot</MenuItem>
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

export default Dashboard;