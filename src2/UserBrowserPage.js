import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { AddFloatButton } from './widgets';
import { PaginationSearchBar, UserList, AccountDialog } from './components';
import { paginationVariables } from './utils';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

class UserBrowserPage extends Component {
	state = {
		dialogShow: false
	}
	onNavigate = (pagination) => {
		this.context.router.push({
			pathname: this.props.location.pathname,
			query: pagination
		});
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	onAdd = () => {
		this.setState({dialogShow: true});
	}
	onSelect = (user) => {
		this.context.router.push(`/dashboard/account/client/${user.id}`);
	}
	handleClose = () => {
		this.setState({dialogShow: false});
	}
	render() {
		const { role } = this.props.params;
		const { first, after, last, before } = this.props.relay.variables;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchBar pageInfo={this.props.viewer.users.pageInfo}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<br/>
					<UserList connection={this.props.viewer.users}
						onSelect={this.onSelect}/>
				</div>
				<AddFloatButton className='page-float-button' onClick={this.onAdd}/>
				<AccountDialog role='client' open={this.state.dialogShow}
					handleClose={this.handleClose} viewer={this.props.viewer}/>
			</div>
		);
	}
}

UserBrowserPage.contextTypes = {
	router: PropTypes.object.isRequired
};

const component = Relay.createContainer(UserBrowserPage, {
	...paginationVariables(),
	fragments: {
		viewer: (variables) => {
			return Relay.QL`
				fragment on Viewer {
					users(search:$search,first:$first,after:$after) @skip(if: $reverse) {
						${UserList.getFragment('connection')}
						pageInfo {
			        hasNextPage
			        hasPreviousPage
			        endCursor
			        startCursor
						}
					}
					users(search:$search,last:$last,before:$before) @include(if: $reverse) {
						${UserList.getFragment('connection')}
						pageInfo {
			        hasNextPage
			        hasPreviousPage
			        endCursor
			        startCursor
						}
					}
					${AccountDialog.getFragment('viewer')}
				}
			`;
		}
	}
});

export default {
	component,
	queries
};

