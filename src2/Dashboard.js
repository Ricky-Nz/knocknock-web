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
				  	<Subheader>Orders</Subheader>
				  	<MenuItem value='/dashboard/orders' leftIcon={<IconOrder/>}>Active Orders</MenuItem>
				  	<MenuItem value='/dashboard/historyorders' leftIcon={<IconHistory/>}>History Orders</MenuItem>
				  	<Subheader>Account</Subheader>
				    <MenuItem value='/dashboard/user/client' leftIcon={<IconUser/>}>Users</MenuItem>
				    <MenuItem value='/dashboard/user/worker' leftIcon={<IconWorker/>}>Workers</MenuItem>
				    <MenuItem value='/dashboard/user/admin' leftIcon={<IconAdmin/>}>Admins</MenuItem>
				    <Subheader>System</Subheader>
				    <MenuItem value='/dashboard/system/dashboard' leftIcon={<IconDashboard/>}>Dashboard</MenuItem>
				    <MenuItem value='/dashboard/system/laundry' leftIcon={<IconStore/>}>Clothe</MenuItem>
				    <MenuItem value='/dashboard/system/promocode' leftIcon={<IconPromoCode/>}>Promo Code</MenuItem>
				    <MenuItem value='/dashboard/system/voucher' leftIcon={<IconVoucher/>}>Voucher</MenuItem>
				    <MenuItem value='/dashboard/system/appbanner' leftIcon={<IconPhone/>}>App Banner</MenuItem>
				    <MenuItem value='/dashboard/system/timeslots' leftIcon={<IconTimer/>}>Order Time Slot</MenuItem>
				    <MenuItem value='/dashboard/system/feedback' leftIcon={<IconFeedback/>}>User Feedback</MenuItem>
				    <Subheader>Function</Subheader>
				    <MenuItem value='/dashboard/function/email' leftIcon={<IconEmail/>}>Send Email</MenuItem>
				    <MenuItem value='/dashboard/function/sms' leftIcon={<IconSMS/>}>Send SMS</MenuItem>
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