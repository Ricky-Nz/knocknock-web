import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { List } from 'material-ui/List';
import { AddFloatButton } from './widgets';
import { PaginationSearchTitle, UserListItem } from './components';
import { preparePageParams } from './common';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

const prepareParams = (params, {location}) => {
	return {
		role: params.role,
		...preparePageParams(location)
	};
};

class UserPage extends Component {
	render() {
		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchTitle location={this.props.location}
						pagination={this.props.viewer.userPage.pagination}/>
					<div className='flex flex-fill scroll'>
						<List>
							{
								this.props.viewer.userPage.datas.map((user, index) =>
									<UserListItem key={index} user={user}/>)
							}
						</List>
					</div>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
			</div>
		);
	}
}

const styles = {
	floatButton: {
		position: 'absolute',
		right: 48,
		bottom: 48
	}
};

const component = Relay.createContainer(UserPage, {
	initialVariables: {
		role: null,
		search: null,
		page: 1,
		limit: 10
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				userPage(role:$role, search: $search, page: $page, limit: $limit) {
					pagination {
						${PaginationSearchTitle.getFragment('pagination')}
					}
					datas {
						${UserListItem.getFragment('user')}
					}
				}
			}
		`
	}
});

export default {
	component,
	queries,
	prepareParams
};

