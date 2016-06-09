import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import FeedbackListItem from './FeedbackListItem';

const FeedbackList = ({connection}) => (
	<List className='scroll' style={styles.scrollBug}>
		{
			connection.edges.map(({node}, index) =>
				<Paper key={index} className='margin-bottom'>
					<FeedbackListItem feedback={node}/>
				</Paper>
			)
		}
	</List>
);

const styles = {
	scrollBug: {
		padding: '0 2'
	}
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