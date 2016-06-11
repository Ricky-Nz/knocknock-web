import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import { AddFloatButton } from './widgets';
import { AdminList, AccountDialog, PaginationSearchBar } from './components';
import { pageInfoFragment, paginationVariables } from './utils';

class AdminBrowserPage extends Component {
	state = {
		dialogShow: false,
		select: null
	}
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	onSelect = (item) => {
		this.setState({dialogShow: true, select: item});
	}
	onAdd = () => {
		this.setState({dialogShow: true, select: null});
	}
	handleClose = () => {
		this.setState({dialogShow: false});
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;
		const { dialogShow, select } = this.state;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchBar pageInfo={this.props.viewer.admins.pageInfo}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<br/>
					<AdminList connection={this.props.viewer.admins}
						onSelect={this.onSelect}/>
				</div>
				<AddFloatButton className='page-float-button' onClick={this.onAdd}/>
				<AccountDialog role='admin' open={dialogShow} handleClose={this.handleClose}
					account={select} viewer={this.props.viewer}/>
			</div>
		);
	}
}

export default Relay.createContainer(AdminBrowserPage, {
	...paginationVariables(),
	fragments: {
		viewer: (variables) => Relay.QL`
			fragment on Viewer {
				admins(search:$search,first:$first,after:$after) @skip(if: $reverse) {
					${AdminList.getFragment('connection')}
					pageInfo {
		        ${pageInfoFragment}
					}
				}
				admins(search:$search,last:$last,before:$before) @include(if: $reverse) {
					${AdminList.getFragment('connection')}
					pageInfo {
		        ${pageInfoFragment}
					}
				}
				${AccountDialog.getFragment('viewer')}
			}
		`
	}
});

