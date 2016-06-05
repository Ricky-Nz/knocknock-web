import React, { Component, PropTypes } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconExit from 'material-ui/svg-icons/action/exit-to-app';
import IconShip from 'material-ui/svg-icons/maps/local-shipping';
import IconUser from 'material-ui/svg-icons/action/supervisor-account';
import IconTimer from 'material-ui/svg-icons/device/access-alarm';
import IconStore from 'material-ui/svg-icons/action/store';
import IconOrder from 'material-ui/svg-icons/maps/local-offer';
import IconEmail from 'material-ui/svg-icons/communication/email';
import IconSMS from 'material-ui/svg-icons/communication/textsms';
import IconFeedback from 'material-ui/svg-icons/action/feedback';
import IconPhone from 'material-ui/svg-icons/hardware/phone-iphone';
import IconVoucher from 'material-ui/svg-icons/action/card-giftcard';
import IconPromoCode from 'material-ui/svg-icons/action/code';
import IconWorker from 'material-ui/svg-icons/maps/local-shipping';
import IconAdmin from 'material-ui/svg-icons/action/assignment-ind';
import IconHistory from 'material-ui/svg-icons/action/history';
import IconDashboard from 'material-ui/svg-icons/action/dashboard';
import IconFactory from 'material-ui/svg-icons/communication/business';
import IconCredit from 'material-ui/svg-icons/action/credit-card';
import { SearchBar } from './widgets';

class Dashboard extends Component {
	onNavitage = (e, value) => {
		if (value !== this.props.location.pathname) {
			this.context.router.push(value);
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
				  	<Subheader>Orders</Subheader>
				  	<MenuItem value='/dashboard/order/active' leftIcon={<IconOrder/>}>Active Orders</MenuItem>
				  	<MenuItem value='/dashboard/order/history' leftIcon={<IconHistory/>}>History Orders</MenuItem>
				  	<MenuItem value='/dashboard/order/timeslots' leftIcon={<IconTimer/>}>Order Time Slot</MenuItem>
				  	<Subheader>Account</Subheader>
				    <MenuItem value='/dashboard/account/client' leftIcon={<IconUser/>}>User</MenuItem>
				    <MenuItem value='/dashboard/account/worker' leftIcon={<IconWorker/>}>Worker</MenuItem>
				    <MenuItem value='/dashboard/account/admin' leftIcon={<IconAdmin/>}>Admin</MenuItem>
				    <MenuItem value='/dashboard/account/factory' leftIcon={<IconFactory/>}>Factory</MenuItem>
				    <Subheader>System</Subheader>
				    <MenuItem value='/dashboard/system/dashboard' leftIcon={<IconDashboard/>}>Dashboard</MenuItem>
				    <MenuItem value='/dashboard/system/credit' leftIcon={<IconCredit/>}>Credit</MenuItem>
				    <MenuItem value='/dashboard/system/laundry' leftIcon={<IconStore/>}>Clothe</MenuItem>
				    <MenuItem value='/dashboard/system/promocode' leftIcon={<IconPromoCode/>}>Promo Code</MenuItem>
				    <MenuItem value='/dashboard/system/appbanner' leftIcon={<IconPhone/>}>App Banner</MenuItem>
				    <MenuItem value='/dashboard/system/feedback' leftIcon={<IconFeedback/>}>User Feedback</MenuItem>
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