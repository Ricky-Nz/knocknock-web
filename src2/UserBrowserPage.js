import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { AddFloatButton } from './widgets';
import { PaginationSearchTitle, UserList, UserDialog } from './components';
import { preparePageParams } from './utils';

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

class UserBrowserPage extends Component {
	state = {
		dialogShow: false
	}
	onItemClick = (user) => {
		this.context.router.push({
			pathname: `/dashboard/user/${this.props.params.role}/${user.id}`
		});
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
	handleClose = () => {
		this.setState({dialogShow: false});
	}
	render() {
		const { role } = this.props.params;
		const { first, after, last, before } = this.props.relay.variables;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchTitle connection={this.props.viewer.users}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<div className='flex flex-fill scroll'>
						<UserList connection={this.props.viewer.users}
							onItemClick={this.onItemClick}/>
					</div>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
				<UserDialog role={role} open={this.state.dialogShow}
				 handleClose={this.handleClose} viewer={this.props.viewer}/>
			</div>
		);
	}
}

UserBrowserPage.contextTypes = {
	router: PropTypes.object.isRequired
};

const styles = {
	floatButton: {
		position: 'absolute',
		right: 48,
		bottom: 48
	}
};

const component = Relay.createContainer(UserBrowserPage, {
	initialVariables: {
		role: null,
		search: null,
		first: 0,
		last: 0,
		after: null,
		before: null
	},
	prepareVariables: (variables) => {
		return {
			...variables,
			reverse: variables.last > 0
		}
	},
	fragments: {
		viewer: (variables) => {
			return Relay.QL`
				fragment on Viewer {
					users(role:$role,search:$search,first:$first,after:$after) @skip(if: $reverse) {
						${PaginationSearchTitle.getFragment('connection')}
						${UserList.getFragment('connection')}
					}
					users(role:$role,search:$search,last:$last,before:$before) @include(if: $reverse) {
						${PaginationSearchTitle.getFragment('connection')}
						${UserList.getFragment('connection')}
					}
					${UserDialog.getFragment('viewer')}
				}
			`;
		}
	}
});

export default {
	component,
	queries,
	prepareParams
};

