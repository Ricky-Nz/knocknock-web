import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { AddFloatButton } from './widgets';
import { PaginationSearchTitle, WorkerList, AccountCreateDialog } from './components';
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

class WorkerBrowserPage extends Component {
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
					<div className='padding'>
						<PaginationSearchTitle pageInfo={this.props.viewer.workers.pageInfo}
							first={first} after={after} last={last} before={before}
							onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					</div>
					<div className='flex flex-fill scroll'>
						<WorkerList connection={this.props.viewer.workers}
							onItemClick={this.onItemClick}/>
					</div>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
				<AccountCreateDialog role='worker' open={this.state.dialogShow}
					handleClose={this.handleClose} viewer={this.props.viewer}/>
			</div>
		);
	}
}

WorkerBrowserPage.contextTypes = {
	router: PropTypes.object.isRequired
};

const styles = {
	floatButton: {
		position: 'absolute',
		right: 24,
		bottom: 24
	}
};

const component = Relay.createContainer(WorkerBrowserPage, {
	initialVariables: {
		search: null,
		first: 0,
		last: 0,
		after: null,
		before: null,
		reverse: false
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
					workers(search:$search,first:$first,after:$after) @skip(if: $reverse) {
						${WorkerList.getFragment('connection')}
						pageInfo {
			        hasNextPage
			        hasPreviousPage
			        endCursor
			        startCursor
						}
					}
					workers(search:$search,last:$last,before:$before) @include(if: $reverse) {
						${WorkerList.getFragment('connection')}
						pageInfo {
			        hasNextPage
			        hasPreviousPage
			        endCursor
			        startCursor
						}
					}
					${AccountCreateDialog.getFragment('viewer')}
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

