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
import UserDetailPage from './UserDetailPage';
import ClothBrowserPage from './ClothBrowserPage';
import OrderBrowserPage from './OrderBrowserPage';
import OrderDetailPage from './OrderDetailPage';
import TimeSlotPage from './TimeSlotPage';

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
				<Route path='user/:role' component={UserBrowserPage.component}
					queries={UserBrowserPage.queries} prepareParams={UserBrowserPage.prepareParams}/>
				<Route path='user/:role/:id' component={UserDetailPage.component}
					queries={UserDetailPage.queries} prepareParams={UserDetailPage.prepareParams}/>
				<Route path='product/laundry' component={ClothBrowserPage.component}
					queries={ClothBrowserPage.queries} prepareParams={ClothBrowserPage.prepareParams}/>
				<Route path='order/new' component={OrderDetailPage.component}
					queries={OrderDetailPage.queries} prepareParams={OrderDetailPage.prepareParams}/>
				<Route path='order/:userId/:orderId' component={OrderDetailPage.component}
					queries={OrderDetailPage.queries} prepareParams={OrderDetailPage.prepareParams}/>
				<Route path='orders' component={OrderBrowserPage.component}
					queries={OrderBrowserPage.queries} prepareParams={OrderBrowserPage.prepareParams}/>
				<Route path='timeslots' component={TimeSlotPage.component}
					queries={TimeSlotPage.queries} prepareParams={TimeSlotPage.prepareParams}/>
			</Route>
		</Route>
	</Router>,
	document.getElementById('root')
);
