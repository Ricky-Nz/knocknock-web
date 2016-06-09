import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { PaginationSearchBar, FeedbackList } from './components';
import { pageInfoFragment, paginationVariables } from './utils';

class FeedbackBrowserPage extends Component {
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	onSelect = (selectBanner) => {
		
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;

		return (
			<div className='flex flex-fill padding'>
				<PaginationSearchBar pageInfo={this.props.viewer.feedbacks.pageInfo}
					first={first} after={after} last={last} before={before}
					onSearch={this.onSearch} onNavigate={this.onNavigate}/>
				<br/>
				<FeedbackList connection={this.props.viewer.feedbacks} onSelect={this.onSelect}/>
			</div>
		);
	}
}

export default Relay.createContainer(FeedbackBrowserPage, {
	...paginationVariables(),
	fragments: {
		viewer: (variables) => {
			return Relay.QL`
				fragment on Viewer {
					feedbacks(search:$search,first:$first,after:$after) @skip(if: $reverse) {
						${FeedbackList.getFragment('connection')}
						pageInfo {
			        ${pageInfoFragment}
						}
					}
					feedbacks(search:$search,last:$last,before:$before) @include(if: $reverse) {
						${FeedbackList.getFragment('connection')}
						pageInfo {
			        ${pageInfoFragment}
						}
					}
				}
			`;
		}
	}
});
