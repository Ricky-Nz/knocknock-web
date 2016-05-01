import React from 'react';
import DashboardDrawer from './DashboardDrawerContainer';

const Dashboard = ({drawer, main}) => (
	<div className='flex flex-fill flex-row'>
		{drawer}
		<div className='flex flex-fill' style={drawer&&styles.mainContainer}>
			{main}
		</div>
	</div>
);

const styles = {
	mainContainer: {
		marginLeft: 256
	}
}

export default Dashboard;