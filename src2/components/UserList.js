import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import UserListItem from './UserListItem';

const UserList = ({connection, onItemClick}) => (
	<List className='scroll' style={styles.scrollBug}>
		{
			connection.edges.map(({node}, index) =>
				<Paper key={index} className='margin-bottom'>
					<UserListItem user={node}
						onClick={onItemClick}/>
				</Paper>
			)
		}
	</List>
);

UserList.propTypes = {
	onItemClick: PropTypes.func.isRequired
};

const styles = {
	scrollBug: {
		padding: '0 2'
	}
};

export default Relay.createContainer(UserList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on UserConnection {
				edges {
					node {
						${UserListItem.getFragment('user')}
					}
				}
			}
		`
	}
})