import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

const TimeSlotListItem = ({timeSlot, onClick}) => (
	<Paper className='margin-vertical'>
		<ListItem primaryText={`${timeSlot.start} ~ ${timeSlot.end}`}
			onClick={() => onClick(timeSlot)}/>
	</Paper>
);

export default Relay.createContainer(TimeSlotListItem, {
	fragments: {
		timeSlot: () => Relay.QL`
			fragment on TimeSlot {
				id
				start
				end
			}
		`
	}
});