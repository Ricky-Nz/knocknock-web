import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// components
import { Application, Dashboard, DashboardDrawer } from './app';
import { LoginPage } from './auth';
import { UserBrowserPage, CreateEditWorkerPage } from './user';

// reducers
import { reducers as appReducers } from './app';
import { reducers as authReducers } from './auth';
import { reducers as userReducers } from './user';

// create store
const store = createStore(
	combineReducers({
		...appReducers,
		...authReducers,
		...userReducers,
		routing: routerReducer
	}),
	applyMiddleware(thunk, createLogger())
);

// sync history
const history = syncHistoryWithStore(hashHistory, store);

function checkSession({location}, replace) {
	if (!localStorage['TOKEN']) {
		replace('/');
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path='/' component={Application}>
				<IndexRedirect to='/login'/>
				<Route path='login' component={LoginPage}/>
				<Route path='dashboard' component={Dashboard} onEnter={checkSession}>
					<IndexRedirect to='browser/worker'/>
					<Route path='browser/:role' components={{drawer: DashboardDrawer, main: UserBrowserPage}}/>
					<Route path='worker/create' components={{drawer: DashboardDrawer, main: CreateEditWorkerPage}}/>
					<Route path='worker/:id' components={{drawer: DashboardDrawer, main: CreateEditWorkerPage}}/>
				</Route>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
