import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { PaginationSearchTitle, FeedbackList } from './components';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

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
				<div className='padding'>
					<Paper className='padding-horizontal'>
						<PaginationSearchTitle pageInfo={this.props.viewer.feedbacks.pageInfo}
							first={first} after={after} last={last} before={before}
							onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					</Paper>
				</div>
				<div className='flex flex-fill scroll padding-horizontal'>
					<FeedbackList connection={this.props.viewer.feedbacks} onSelect={this.onSelect}/>
				</div>
			</div>
		);
	}
}

const component = Relay.createContainer(FeedbackBrowserPage, {
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
					feedbacks(search:$search,first:$first,after:$after) @skip(if: $reverse) {
						${FeedbackList.getFragment('connection')}
						pageInfo {
			        hasNextPage
			        hasPreviousPage
			        endCursor
			        startCursor
						}
					}
					feedbacks(search:$search,last:$last,before:$before) @include(if: $reverse) {
						${FeedbackList.getFragment('connection')}
						pageInfo {
			        hasNextPage
			        hasPreviousPage
			        endCursor
			        startCursor
						}
					}
				}
			`;
		}
	}
});

export default {
	component,
	queries
};

