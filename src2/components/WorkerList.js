import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import WorkerListItem from './WorkerListItem';

const WorkerList = ({connection, onItemClick}) => (
	<List>
		{
			connection.edges.map(({node}, index) =>
				<WorkerListItem key={index} worker={node}
					onClick={onItemClick}/>)
		}
	</List>
);

WorkerList.propTypes = {
	onItemClick: PropTypes.func.isRequired
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