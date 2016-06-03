import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { AddFloatButton } from './widgets';
import { PaginationSearchTitle, BannerList, BannerEditDialog } from './components';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

class BannerBrowserPage extends Component {
	state = {
		dialogShow: false,
		selectBanner: null
	}
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	onAdd = () => {
		this.setState({dialogShow: true, selectBanner: null});
	}
	handleClose = () => {
		this.setState({dialogShow: false});
	}
	onSelectBanner = (selectBanner) => {
		this.setState({selectBanner, dialogShow: true});
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<div className='padding'>
						<Paper className='padding-horizontal'>
							<PaginationSearchTitle pageInfo={this.props.viewer.banners.pageInfo}
								first={first} after={after} last={last} before={before}
								onSearch={this.onSearch} onNavigate={this.onNavigate}/>
						</Paper>
					</div>
					<div className='flex flex-fill scroll padding-horizontal'>
						<BannerList connection={this.props.viewer.banners} onSelect={this.onSelectBanner}/>
					</div>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
				<BannerEditDialog viewer={this.props.viewer} handleClose={this.handleClose}
					open={this.state.dialogShow} banner={this.state.selectBanner}/>
			</div>
		);
	}
}

const styles = {
	floatButton: {
		position: 'absolute',
		right: 24,
		bottom: 24
	}
};

const component = Relay.createContainer(BannerBrowserPage, {
	initialVariables: {
		search: null,
		first: 10,
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
					banners(search:$search,first:$first,after:$after) @skip(if: $reverse) {
						${BannerList.getFragment('connection')}
						pageInfo {
			        hasNextPage
			        hasPreviousPage
			        endCursor
			        startCursor
						}
					}
					banners(search:$search,last:$last,before:$before) @include(if: $reverse) {
						${BannerList.getFragment('connection')}
						pageInfo {
			        hasNextPage
			        hasPreviousPage
			        endCursor
			        startCursor
						}
					}
					${BannerEditDialog.getFragment('viewer')}
				}
			`;
		}
	}
});

export default {
	component,
	queries
};

