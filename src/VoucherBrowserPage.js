import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { AddFloatButton } from './widgets';
import { PaginationSearchBar, VoucherList, VoucherDialog } from './components';
import { pageInfoFragment, paginationVariables } from './utils';

class VoucherBrowserPage extends Component {
	state = {
		dialogShow: false,
		voucherId: null
	}
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	handleClose = () => {
		this.setState({dialogShow: false});
	}
	onSelect = (voucher) => {
		this.setState({dialogShow: true, voucherId: voucher.id});
	}
	onAdd = () => {
		this.setState({dialogShow: true, voucherId: null});
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;
		const { voucherId, dialogShow } = this.state;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchBar pageInfo={this.props.viewer.vouchers.pageInfo}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<br/>
					<VoucherList connection={this.props.viewer.vouchers} onSelect={this.onSelect}/>
				</div>
				<AddFloatButton className='page-float-button' onClick={this.onAdd}/>
				<VoucherDialog viewer={this.props.viewer} handleClose={this.handleClose}
					open={dialogShow} voucherId={voucherId}/>
			</div>
		);
	}
}

export default Relay.createContainer(VoucherBrowserPage, {
	...paginationVariables(),
	fragments: {
		viewer: (variables) => {
			return Relay.QL`
				fragment on Viewer {
					vouchers(search:$search,first:$first,after:$after) @skip(if: $reverse) {
						${VoucherList.getFragment('connection')}
						pageInfo {
			        ${pageInfoFragment}
						}
					}
					vouchers(search:$search,last:$last,before:$before) @include(if: $reverse) {
						${VoucherList.getFragment('connection')}
						pageInfo {
			        ${pageInfoFragment}
						}
					}
					${VoucherDialog.getFragment('viewer')}
				}
			`;
		}
	}
});

