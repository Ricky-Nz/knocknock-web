import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TimeSlotListItem from './TimeSlotListItem';

const TimeSlotList= ({connection, onSelect}) => (
	<List className='scroll' style={styles.scrollBug}>
		{
			connection.edges.map(({node}, index) =>
				<Paper key={index} className='margin-bottom'>
					<TimeSlotListItem slot={node} onClick={onSelect}/>
				</Paper>
			)
		}
	</List>
);

TimeSlotList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

const styles = {
	scrollBug: {
		padding: '0 2'
	}
};

export default Relay.createContainer(TimeSlotList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on TimeSlotConnection {
				edges {
					node {
						${TimeSlotListItem.getFragment('slot')}
					}
				}
			}
		`
	}
})