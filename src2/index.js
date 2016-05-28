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
import TimeSlotPage from './TimeSlotPage';
import FactoryPage from './FactoryPage';

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
					<Route path=':userId/:orderId' component={OrderCreatePage.component}
						queries={OrderCreatePage.queries} prepareParams={OrderCreatePage.prepareParams}/>
					<Route path='timeslots' component={TimeSlotPage.component}
						queries={TimeSlotPage.queries} prepareParams={TimeSlotPage.prepareParams}/>
				</Route>
				<Route path='account'>
					<Route path='factory' component={FactoryPage.component}
						queries={FactoryPage.queries} prepareParams={FactoryPage.prepareParams}/>
					<Route path='client' component={UserBrowserPage.component}
						queries={UserBrowserPage.queries} prepareParams={UserBrowserPage.prepareParams}/>
					<Route path='worker' component={WorkerBrowserPage.component}
						queries={WorkerBrowserPage.queries} prepareParams={WorkerBrowserPage.prepareParams}/>
					<Route path=':role/:id' component={UserDetailPage.component}
						queries={UserDetailPage.queries} prepareParams={UserDetailPage.prepareParams}/>
				</Route>
				<Route path='system'>
					<Route path='laundry' component={ClothBrowserPage.component}
						queries={ClothBrowserPage.queries} prepareParams={ClothBrowserPage.prepareParams}/>
				</Route>
			</Route>
		</Route>
	</Router>,
	document.getElementById('root')
);
