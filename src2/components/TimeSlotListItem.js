import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';

const TimeSlotListItem = ({timeSlot, onAction}) => (
	<Paper className='margin-vertical'>
		<ListItem primaryText={`${timeSlot.start} ~ ${timeSlot.end}`}
			onTouchTap={() => onAction(timeSlot, 'EDIT')}
			rightIconButton={
			  <IconMenu onChange={(event, value) => onAction(timeSlot, value)}
			  	iconButtonElement={<IconButton touch={true}><IconMoreVert/></IconButton>}>
			    <MenuItem value='DELETE'>Delete</MenuItem>
			  </IconMenu>
			}/>
	</Paper>
);

TimeSlotListItem.propTypes = {
	onAction: PropTypes.func.isRequired
};

export default Relay.createContainer(TimeSlotListItem, {
	fragments: {
		timeSlot: () => Relay.QL`
			fragment on TimeSlot {
				id
				start
				end
				enabled
			}
		`
	}
});