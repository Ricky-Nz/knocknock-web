import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import FeedbackListItem from './FeedbackListItem';

const FeedbackList = ({connection, onItemClick}) => (
	<List>
		{
			connection.edges.map(({node}, index) =>
				<FeedbackListItem key={index} user={node}
					onClick={onSelect}/>)
		}
	</List>
);

FeedbackList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(FeedbackList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on FeedbackConnection {
				edges {
					node {
						${FeedbackListItem.getFragment('feedback')}
					}
				}
			}
		`
	}
})