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
		return (
			<Paper className='margin-bottom'>
				<div className='flex flex-row flex-space-between padding-horizontal'>
					<SearchBar ref='search' onSearch={this.onSearch}/>
					<PaginationBar pagination={this.props.pagination}
						onNavigate={this.onNavigate}/>
				</div>
			</Paper>
		);
	}
}

PaginationSearchTitle.propTypes = {
	location: PropTypes.object.isRequired
};

PaginationSearchTitle.contextTypes = {
	router: PropTypes.object.isRequired
};

export default Relay.createContainer(PaginationSearchTitle, {
	fragments: {
		pagination: () => Relay.QL`
			fragment on Pagination {
				${PaginationBar.getFragment('pagination')}
			}
		`
	}
});