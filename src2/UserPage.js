import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { SearchBar } from './widgets';
import { UserList, SearchTitlebar, PaginationBar } from './components';
import { preparePageParams } from './common';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

const prepareParams = (params, {location}) => {
	return {
		role: params.role,
		...preparePageParams(location)
	};
};

class UserPage extends Component {
	onNavigate = (params) => {
		this.context.router.push({
			pathname: 'dashboard/user/client',
			query: Object.assign({}, this.props.location.query, params)
		});
	}
	onSearch = (text) => {
		this.context.router.push({
			pathname: 'dashboard/user/client',
			query: Object.assign({},
				this.props.location.query, {search: text})
		});
	}
	render() {
		const { limit, cursor, reverse } = this.props.location.query;

		return (
			<div className='flex flex-fill padding'>
				<SearchTitlebar onSearch={this.onSearch} lastChild={
		    	<PaginationBar limit={limit} cursor={cursor} reverse={reverse}
		    		pageInfo={this.props.viewer.users.pageInfo} onNavigate={this.onNavigate}/>}/>
				<div className='flex flex-fill scroll'>
					<UserList users={this.props.viewer.users}/>
				</div>
			</div>
		);
	}
}

UserPage.contextTypes = {
	router: PropTypes.object
};

const component = Relay.createContainer(UserPage, {
	initialVariables: {
		role: null,
		reverse: true,
		search: null,
		limit: 0,
		cursor: null
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
				users(role:$role, search: $search, first: $limit, after: $cursor) @skip(if: $reverse) {
					${UserList.getFragment('users')}
					pageInfo {
						startCursor
						endCursor
						hasNextPage
						hasPreviousPage
					}
				}
			}
		`
	}
});

export default {
	component,
	queries,
	prepareParams
};