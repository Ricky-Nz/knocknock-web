import React from 'react';
import ReactROM from 'react-dom';
import Relay from 'react-relay';
import { Router, IndexRoute, Route, applyRouterMiddleware, hashHistory } from 'react-router';
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
import OrderCreatePage from './OrderCreatePage';
import OrderDetailPage from './OrderDetailPage';
import TimeSlotPage from './TimeSlotPage';
import AdminBrowserPage from './AdminBrowserPage';
import FactoryBrowserPage from './FactoryBrowserPage';
import PromoCodeBrowserPage from './PromoCodeBrowserPage';
import BannerBrowserPage from './BannerBrowserPage';
import FeedbackBrowserPage from './FeedbackBrowserPage';
import CreditBrowserPage from './CreditBrowserPage';
import AnalyticsPage from './AnalyticsPage';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql')
);

const App = ({children}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  	<div className='app flex'>
    	{children}
    </div>
  </MuiThemeProvider>
);

ReactROM.render(
	<Router history={hashHistory}
		render={applyRouterMiddleware(useRelay)}
		environment={Relay.Store}>
		<Route path='/' component={App}>
			<Route path='dashboard' component={Dashboard}>
				<Route path='order'>
					<Route path='active' component={OrderBrowserPage.component}
						queries={OrderBrowserPage.queries} prepareParams={OrderBrowserPage.prepareParams}/>
					<Route path='history' component={OrderBrowserPage.component}
						queries={OrderBrowserPage.queries} prepareParams={OrderBrowserPage.prepareParams}/>
					<Route path='new' component={OrderCreatePage.component}
						queries={OrderCreatePage.queries} prepareParams={OrderCreatePage.prepareParams}/>
					<Route path='new/:userId' component={OrderCreatePage.component}
						queries={OrderCreatePage.queries} prepareParams={OrderCreatePage.prepareParams}/>
					<Route path=':userId/:orderId' component={OrderDetailPage.component}
						queries={OrderDetailPage.queries} prepareParams={OrderDetailPage.prepareParams}/>
					<Route path='timeslots' component={TimeSlotPage.component}
						queries={TimeSlotPage.queries} prepareParams={TimeSlotPage.prepareParams}/>
				</Route>
				<Route path='account'>
					<Route path='client' component={UserBrowserPage.component}
						queries={UserBrowserPage.queries} prepareParams={UserBrowserPage.prepareParams}/>
					<Route path='client/:id' component={UserDetailPage.component}
						queries={UserDetailPage.queries} prepareParams={UserDetailPage.prepareParams}/>
					<Route path='admin' component={AdminBrowserPage.component}
						queries={AdminBrowserPage.queries} prepareParams={AdminBrowserPage.prepareParams}/>
					<Route path='factory' component={FactoryBrowserPage.component}
						queries={FactoryBrowserPage.queries} prepareParams={FactoryBrowserPage.prepareParams}/>
					<Route path='worker' component={WorkerBrowserPage.component}
						queries={WorkerBrowserPage.queries} prepareParams={WorkerBrowserPage.prepareParams}/>
				</Route>
				<Route path='system'>
					<Route path='dashboard' component={AnalyticsPage.component}
						queries={AnalyticsPage.queries} prepareParams={AnalyticsPage.prepareParams}/>
					<Route path='credit' component={CreditBrowserPage.component}
						queries={CreditBrowserPage.queries} prepareParams={CreditBrowserPage.prepareParams}/>
					<Route path='laundry' component={ClothBrowserPage.component}
						queries={ClothBrowserPage.queries} prepareParams={ClothBrowserPage.prepareParams}/>
					<Route path='promocode' component={PromoCodeBrowserPage.component}
						queries={PromoCodeBrowserPage.queries} prepareParams={PromoCodeBrowserPage.prepareParams}/>
					<Route path='appbanner' component={BannerBrowserPage.component}
						queries={BannerBrowserPage.queries} prepareParams={BannerBrowserPage.prepareParams}/>
					<Route path='feedback' component={FeedbackBrowserPage.component}
						queries={FeedbackBrowserPage.queries} prepareParams={FeedbackBrowserPage.prepareParams}/>
				</Route>
			</Route>
		</Route>
	</Router>,
	document.getElementById('root')
);
