import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TimeSlotTemplateListItem from './TimeSlotTemplateListItem';

const TimeSlotTemplateList= ({connection, onSelect}) => (
	<List className='scroll' style={styles.scrollBug}>
		{
			connection.edges.map(({node}, index) =>
				<Paper key={index} className='margin-bottom'>
					<TimeSlotTemplateListItem template={node} onClick={onSelect}/>
				</Paper>
			)
		}
	</List>
);

TimeSlotTemplateList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

const styles = {
	scrollBug: {
		padding: '0 2'
	}
};

export default Relay.createContainer(TimeSlotTemplateList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on TimeSlotTemplateConnection {
				edges {
					node {
						${TimeSlotTemplateListItem.getFragment('template')}
					}
				}
			}
		`
	}
})