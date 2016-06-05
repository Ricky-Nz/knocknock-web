import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { AddFloatButton } from './widgets';
import { PaginationSearchBar, WorkerList, AccountDialog } from './components';
import { pageFloatBtnStyle, paginationVariables } from './utils';

class WorkerBrowserPage extends Component {
	state = {
		dialogShow: false
	}
	onSelect = (worker) => {

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
		const { first, after, last, before } = this.props.relay.variables;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchBar pageInfo={this.props.viewer.workers.pageInfo}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<br/>
					<WorkerList connection={this.props.viewer.workers}
						onSelect={this.onSelect}/>
				</div>
				<AddFloatButton className='page-float-button' onClick={this.onAdd}/>
				<AccountDialog role='worker' open={this.state.dialogShow}
					handleClose={this.handleClose} viewer={this.props.viewer}/>
			</div>
		);
	}
}

WorkerBrowserPage.contextTypes = {
	router: PropTypes.object.isRequired
};

export default Relay.createContainer(WorkerBrowserPage, {
	...paginationVariables(),
	fragments: {
		viewer: (variables) => Relay.QL`
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
				${AccountDialog.getFragment('viewer')}
			}
		`
	}
});

