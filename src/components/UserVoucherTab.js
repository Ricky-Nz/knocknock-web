import React, { Component } from 'react';
import Relay from 'react-relay';
import AssignedVoucherList from './AssignedVoucherList';
import PaginationSearchBar from './PaginationSearchBar';
import { AddFloatButton } from '../widgets';
import { paginationVariables } from '../utils';

class UserVoucherTab extends Component {
	onAdd = () => {

	}
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	onSelect = (voucher) => {

	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;
		
		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchBar pageInfo={this.props.user.vouchers.pageInfo}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<br/>
					<AssignedVoucherList connection={this.props.user.vouchers} onSelect={this.onSelect}/>
				</div>
				<AddFloatButton className='page-float-button' onClick={this.onAdd}/>
			</div>
		);
	}
}

export default Relay.createContainer(UserVoucherTab, {
	...paginationVariables(),
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				vouchers(search:$search,first:$first,after:$after) @skip(if: $reverse) {
					${AssignedVoucherList.getFragment('connection')}
					pageInfo {
					  hasNextPage
					  hasPreviousPage
					  endCursor
					  startCursor
					}
				}
				vouchers(search:$search,last:$last,before:$before) @include(if: $reverse) {
					${AssignedVoucherList.getFragment('connection')}
					pageInfo {
					  hasNextPage
					  hasPreviousPage
					  endCursor
					  startCursor
					}
				}
			}
		`
	}
});