import React, { Component } from 'react';
import Relay from 'react-relay';
import CreditList from './CreditList';
import PaginationSearchBar from './PaginationSearchBar';
import { pageInfoFragment, paginationVariables } from '../utils';

class UserCreditTab extends Component {
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	onSelect = () => {

	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;
		
		return (
			<div className='flex flex-fill padding'>
				<PaginationSearchBar pageInfo={this.props.user.creditRecords.pageInfo}
					first={first} after={after} last={last} before={before}
					onSearch={this.onSearch} onNavigate={this.onNavigate}/>
				<br/>
				<CreditList connection={this.props.user.creditRecords} onSelect={this.onSelect}/>
			</div>
		);
	}
}

export default Relay.createContainer(UserCreditTab, {
	...paginationVariables(),
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				creditRecords(search:$search,first:$first,after:$after) @skip(if: $reverse) {
					${CreditList.getFragment('connection')}
					pageInfo {
		        ${pageInfoFragment}
					}
				}
				creditRecords(search:$search,last:$last,before:$before) @include(if: $reverse) {
					${CreditList.getFragment('connection')}
					pageInfo {
		        ${pageInfoFragment}
					}
				}
			}
		`
	}
});