import React, { Component } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { SearchBar } from './widgets';
import PaginationBar from './PaginationBar';

class PaginationTitlebar extends Component {
	onNavigate = (params) => {
		this.context.router.push({
			pathname: this.props.location.pathname,
			query: params
		});
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search: text});
	}
	render() {
		return (
			<Paper zDepth={2}>
				<Toolbar>
					<ToolbarGroup className='padding-horizontal' firstChild={true}>
			    	<ToolbarTitle text={this.props.params.role}/>
			    	<SearchBar onSearch={this.onSearch}/>
			    </ToolbarGroup>
			    <ToolbarGroup className='padding-horizontal' lastChild={true}>
			    	<PaginationBar limit={limit} cursor={cursor} reverse={reverse}
			    		onNavigate={this.onNavigate} pageInfo={this.props.viewer.users.pageInfo}/>
			    </ToolbarGroup>
				</Toolbar>
			</Paper>
		);
	}
}

PaginationTitlebar.contextTypes = {
	router: PropTypes.object
};

export const UserPanel = Relay.createContainer(PaginationTitlebar, {
	initialVariables: {
		ss: null,
		role: null,
		limit: 0,
		cursor: null,
		reverse: false,
		search: null
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				users(role: $role, search: $search, first: $limit, after: $cursor) @skip(if: $reverse) {
					pageInfo {
						startCursor
		        endCursor
		        hasNextPage
		        hasPreviousPage
					}
				}
				users(role: $role, search: $search, last: $limit, before: $cursor) @include(if: $reverse) {
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