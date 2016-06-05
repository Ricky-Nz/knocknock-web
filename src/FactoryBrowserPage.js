import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import { AddFloatButton } from './widgets';
import { FactoryList, PaginationSearchBar, FactoryDialog } from './components';
import { pageFloatBtnStyle, paginationVariables } from './utils';

class FactoryBrowserPage extends Component {
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
					<PaginationSearchBar pageInfo={this.props.viewer.factories.pageInfo}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<br/>
					<FactoryList connection={this.props.viewer.factories}
						onSelect={this.onSelect}/>
				</div>
				<AddFloatButton className='page-float-button' onClick={this.onAdd}/>
				<FactoryDialog open={dialogShow} handleClose={this.handleClose}
					factory={select} viewer={this.props.viewer}/>
			</div>
		);
	}
}

export default Relay.createContainer(FactoryBrowserPage, {
	...paginationVariables(),
	fragments: {
		viewer: (variables) => Relay.QL`
			fragment on Viewer {
				factories(search:$search,first:$first,after:$after) @skip(if: $reverse) {
					${FactoryList.getFragment('connection')}
					pageInfo {
		        hasNextPage
		        hasPreviousPage
		        endCursor
		        startCursor
					}
				}
				factories(search:$search,last:$last,before:$before) @include(if: $reverse) {
					${FactoryList.getFragment('connection')}
					pageInfo {
		        hasNextPage
		        hasPreviousPage
		        endCursor
		        startCursor
					}
				}
				${FactoryDialog.getFragment('viewer')}
			}
		`
	}
});

