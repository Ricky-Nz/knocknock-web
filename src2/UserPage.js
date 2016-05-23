import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { AddFloatButton } from './widgets';
import { PaginationSearchTitle, UserList } from './components';
import { preparePageParams } from './utils';

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
	onItemClick = (user) => {

	}
	onNavigate = (pagination) => {
		this.context.router.push({
			pathname: this.props.location.pathname,
			query: pagination
		});
	}
	render() {
		const { first, after } = this.props.relay.variables;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchTitle connection={this.props.viewer.users}
						first={first} after={after} onNavigate={this.onNavigate}/>
					<div className='flex flex-fill scroll'>
						<UserList connection={this.props.viewer.users}
							onItemClick={this.onItemClick}/>
					</div>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
			</div>
		);
	}
}

UserPage.contextTypes = {
	router: PropTypes.object.isRequired
};

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
		first: 10,
		after: null
	},
	fragments: {
		viewer: () => {
			const test = 'role:$role,first:$first,after:$after';

			return Relay.QL`
				fragment on Viewer {
					users(role:$role,first:$first,after:$after) {
						${PaginationSearchTitle.getFragment('connection')}
						${UserList.getFragment('connection')}
					}
				}
			`;
		}
	}
});

export default {
	component,
	queries,
	prepareParams
};

