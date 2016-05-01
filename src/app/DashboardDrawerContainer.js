import { connect } from 'react-redux';
import { logOut } from '../auth';
import DashboardDrawer from './DashboardDrawer';

const mapActionToProps = dispatch => ({
	logOut: () => {
		dispatch(logOut());
	}
});

export default connect(null, mapActionToProps)(DashboardDrawer);