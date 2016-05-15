import React from 'react';
import ReactROM from 'react-dom';
import Relay from 'react-relay';
import { Router, IndexRoute, Route, applyRouterMiddleware, hashHistory } from 'react-router';
import useRelay from 'react-router-relay';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Dashboard } from './Dashboard';
import { UserPanel } from './UserPanel';
import { LaundryClothPanel } from './LaundryClothPanel';

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

const preparePagination = (location) => {
	return {
		limit: parseInt(location.query.limit||10),
		cursor: location.query.cursor||null,
		reverse: location.query.reverse?true:false,
		search: location.query.search||null
	};
};

const prepareUserParams = (params, {location}) => {
	return {
		role: params.role,
		...preparePagination(location)
	};
};

const prepareProductParams = (params, {location}) => {
	return {
		...preparePagination(location)
	};
};

export const RootQuery = {
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
			<Route path='dashboard' component={Dashboard}>
				<Route path='user/:role' component={UserPanel}
					queries={RootQuery} prepareParams={prepareUserParams}/>
				<Route path='product/laundry' component={LaundryClothPanel}
					queries={RootQuery} prepareParams={prepareProductParams}/>
			</Route>
		</Route>
	</Router>,
	document.getElementById('root')
);

			// <Route path='user' component={UserList} queries={UserListQuery}
			// 	render={({props}) => props ? <UserList {...props} /> : <div/>}
			// 	prepareParams={(params, {location}) => ({token: 'ssss'})}/>