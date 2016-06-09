import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { PaginationSearchBar, CreditList } from './components';
import { pageInfoFragment, paginationVariables } from './utils';

class CreditBrowserPage extends Component {
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	onSelect = (credit) => {
		
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;

		return (
			<div className='flex flex-fill padding'>
				<PaginationSearchBar pageInfo={this.props.viewer.creditRecords.pageInfo}
					first={first} after={after} last={last} before={before}
					onSearch={this.onSearch} onNavigate={this.onNavigate}/>
				<br/>
				<CreditList connection={this.props.viewer.creditRecords} onSelect={this.onSelect}/>
			</div>
		);
	}
}

export default Relay.createContainer(CreditBrowserPage, {
	...paginationVariables(),
	fragments: {
		viewer: (variables) => {
			return Relay.QL`
				fragment on Viewer {
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
			`;
		}
	}
});

