import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { SearchBar } from '../widgets';
import PaginationBar from './PaginationBar';

class PaginationSearchBar extends Component {
	render() {
		const { first, after, last, before } = this.props;
		const { hasNextPage, hasPreviousPage, endCursor, startCursor } = this.props.pageInfo;

		return (
			<Paper className='padding-horizontal'>
				<div className='flex flex-row flex-space-between'>
					<SearchBar ref='search' onSearch={this.props.onSearch}/>
					<PaginationBar startCursor={startCursor} endCursor={endCursor}
						hasNextPage={hasNextPage} hasPreviousPage={hasPreviousPage}
						first={first} after={after} last={last} before={before}
						onNavigate={this.props.onNavigate}/>
				</div>
			</Paper>
		);
	}
}

PaginationSearchBar.propTypes = {
	first: PropTypes.number,
	last: PropTypes.number,
	after: PropTypes.string,
	before: PropTypes.string,
	pageInfo: PropTypes.object.isRequired,
	onNavigate: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired
};

export default PaginationSearchBar;