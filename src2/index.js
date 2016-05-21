import React from 'react';
import ReactROM from 'react-dom';
import Relay from 'react-relay';
import { Router, IndexRoute, Route, applyRouterMiddleware, hashHistory } from 'react-router';
import useRelay from 'react-router-relay';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Dashboard from './Dashboard';
import UserPage from './UserPage';
import ClothPage from './ClothPage';

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
				<Route path='user/:role' component={UserPage.component}
					queries={UserPage.queries} prepareParams={UserPage.prepareParams}/>
				<Route path='product/laundry' component={ClothPage.component}
					queries={ClothPage.queries} prepareParams={ClothPage.prepareParams}/>
			</Route>
		</Route>
	</Router>,
	document.getElementById('root')
);
