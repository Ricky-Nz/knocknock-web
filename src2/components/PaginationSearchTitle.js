import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { SearchBar } from '../widgets';
import PaginationBar from './PaginationBar';

class PaginationSearchTitle extends Component {
	onNavigate = (pagination) => {
		this.context.router.push({
			pathname: this.props.location.pathname,
			query: {...this.props.location.query, ...pagination}
		})
	}
	onSearch = (text) => {
		this.context.router.push({
			pathname: this.props.location.pathname,
			query: {...this.props.location.query, search: text}
		});
	}
	render() {
		const { first, after } = this.props;
		const { hasNextPage, endCursor, startCursor } = this.props.connection.pageInfo;

		return (
			<Paper className='margin-bottom'>
				<div className='flex flex-row flex-space-between padding-horizontal'>
					<SearchBar ref='search' onSearch={this.onSearch}/>
					<PaginationBar startCursor={startCursor} endCursor={endCursor}
						hasNextPage={hasNextPage} first={first} after={after}
						onNavigate={this.props.onNavigate}/>
				</div>
			</Paper>
		);
	}
}

PaginationSearchTitle.propTypes = {
	first: PropTypes.number.isRequired,
	after: PropTypes.string,
	onNavigate: PropTypes.func.isRequired
};

export default Relay.createContainer(PaginationSearchTitle, {
	fragments: {
		connection: () => Relay.QL`
			fragment on UserConnection {
				pageInfo {
	        hasNextPage
	        endCursor
	        startCursor
				}
			}
		`
	}
});