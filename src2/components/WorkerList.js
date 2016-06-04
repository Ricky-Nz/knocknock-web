import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import WorkerListItem from './WorkerListItem';

const WorkerList = ({connection, onSelect}) => (
	<List className='scroll' style={styles.scrollBug}>
		{
			connection.edges.map(({node}, index) =>
				<Paper key={index} className='margin-bottom'>
					<WorkerListItem worker={node} onClick={onSelect}/>
				</Paper>
			)
		}
	</List>
);

WorkerList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

const styles = {
	scrollBug: {
		padding: '0 2'
	}
};

export default Relay.createContainer(WorkerList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on WorkerConnection {
				edges {
					node {
						${WorkerListItem.getFragment('worker')}
					}
				}
			}
		`
	}
})