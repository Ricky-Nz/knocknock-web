import React from 'react';
import ReactROM from 'react-dom';
import Relay from 'react-relay';
import { Router, IndexRoute, IndexRedirect, Route, applyRouterMiddleware, hashHistory } from 'react-router';
import useRelay from 'react-router-relay';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Dashboard from './Dashboard';
import UserBrowserPage from './UserBrowserPage';
import WorkerBrowserPage from './WorkerBrowserPage';
import UserDetailPage from './UserDetailPage';
import ClothBrowserPage from './ClothBrowserPage';
import OrderBrowserPage from './OrderBrowserPage';
import OrderDetailPage from './OrderDetailPage';
import TimeSlotPage from './TimeSlotPage';
import AdminBrowserPage from './AdminBrowserPage';
import FactoryBrowserPage from './FactoryBrowserPage';
import PromoCodeBrowserPage from './PromoCodeBrowserPage';
import BannerBrowserPage from './BannerBrowserPage';
import FeedbackBrowserPage from './FeedbackBrowserPage';
import CreditBrowserPage from './CreditBrowserPage';
import AnalyticsPage from './AnalyticsPage';
import HistoryOrderPage from './HistoryOrderPage';
import { Loading } from './widgets';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql')
);

const App = ({children}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  	<div className='app flex'>
    	{children}
    </div>
  </MuiThemeProvider>
);

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

ReactROM.render(
	<Router history={hashHistory}
		render={applyRouterMiddleware(useRelay)}
		environment={Relay.Store}>
		<Route path='/' component={App}>
			<IndexRedirect to="dashboard" />
			<Route path='dashboard' component={Dashboard}>
				<IndexRedirect to="order" />
				<Route path='order'>
					<IndexRedirect to="active" />
					<Route path='active' component={OrderBrowserPage} queries={queries}
						render={({props}) => props ? <OrderBrowserPage {...props}/> : <Loading/>}/>
					<Route path='history' component={HistoryOrderPage} queries={queries}
						render={({props}) => props ? <HistoryOrderPage {...props}/> : <Loading/>}/>
					<Route path='timeslots' component={TimeSlotPage} queries={queries}
						render={({props}) => props ? <TimeSlotPage {...props}/> : <Loading/>}/>
					<Route path=':userId/:orderId' component={OrderDetailPage} queries={queries}
						render={({props}) => props ? <OrderDetailPage {...props}/> : <Loading/>}/>
				</Route>
				<Route path='account'>
					<Route path='client' component={UserBrowserPage} queries={queries}
						render={({props}) => props ? <UserBrowserPage {...props}/> : <Loading/>}/>
					<Route path='client/:id' component={UserDetailPage} queries={queries}
						render={({props}) => props ? <UserDetailPage {...props}/> : <Loading/>}/>
					<Route path='admin' component={AdminBrowserPage} queries={queries}
						render={({props}) => props ? <AdminBrowserPage {...props}/> : <Loading/>}/>
					<Route path='factory' component={FactoryBrowserPage} queries={queries}
						render={({props}) => props ? <FactoryBrowserPage {...props}/> : <Loading/>}/>
					<Route path='worker' component={WorkerBrowserPage} queries={queries}
						render={({props}) => props ? <WorkerBrowserPage {...props}/> : <Loading/>}/>
				</Route>
				<Route path='system'>
					<Route path='dashboard' component={AnalyticsPage} queries={queries}
						render={({props}) => props ? <AnalyticsPage {...props}/> : <Loading/>}/>
					<Route path='credit' component={CreditBrowserPage} queries={queries}
						render={({props}) => props ? <CreditBrowserPage {...props}/> : <Loading/>}/>
					<Route path='laundry' component={ClothBrowserPage} queries={queries}
						render={({props}) => props ? <ClothBrowserPage {...props}/> : <Loading/>}/>
					<Route path='promocode' component={PromoCodeBrowserPage} queries={queries}
						render={({props}) => props ? <PromoCodeBrowserPage {...props}/> : <Loading/>}/>
					<Route path='appbanner' component={BannerBrowserPage} queries={queries}
						render={({props}) => props ? <BannerBrowserPage {...props}/> : <Loading/>}/>
					<Route path='feedback' component={FeedbackBrowserPage}  queries={queries}
						render={({props}) => props ? <FeedbackBrowserPage {...props}/> : <Loading/>}/>
				</Route>
			</Route>
		</Route>
	</Router>,
	document.getElementById('root')
);
