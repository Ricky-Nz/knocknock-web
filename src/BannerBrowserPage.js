import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { AddFloatButton } from './widgets';
import { PaginationSearchBar, BannerList, BannerEditDialog } from './components';
import { pageInfoFragment, paginationVariables } from './utils';

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
					<PaginationSearchBar pageInfo={this.props.viewer.banners.pageInfo}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<br/>
					<BannerList connection={this.props.viewer.banners} onSelect={this.onSelectBanner}/>
				</div>
				<AddFloatButton className='page-float-button' onClick={this.onAdd}/>
				<BannerEditDialog viewer={this.props.viewer} handleClose={this.handleClose}
					open={this.state.dialogShow} banner={this.state.selectBanner}/>
			</div>
		);
	}
}

export default Relay.createContainer(BannerBrowserPage, {
	...paginationVariables(),
	fragments: {
		viewer: (variables) => Relay.QL`
			fragment on Viewer {
				banners(search:$search,first:$first,after:$after) @skip(if: $reverse) {
					${BannerList.getFragment('connection')}
					pageInfo {
		        ${pageInfoFragment}
					}
				}
				banners(search:$search,last:$last,before:$before) @include(if: $reverse) {
					${BannerList.getFragment('connection')}
					pageInfo {
		        ${pageInfoFragment}
					}
				}
				${BannerEditDialog.getFragment('viewer')}
			}
		`
	}
});

