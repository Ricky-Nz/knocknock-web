import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';
import { UpdateTimeSlotMutation } from '../mutations';

class TimeSlotListItem extends Component {
	onClick = () => {
		this.props.onClick(this.props.slot);
	}
	render() {
		const { slot } = this.props;
		return (
			<ListItem primaryText={`${slot.time}`}
				secondaryText={`Quntity: ${slot.quantity}`} onClick={this.onClick}/>
		);
	}
}

TimeSlotListItem.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default Relay.createContainer(TimeSlotListItem, {
	fragments: {
		slot: () => Relay.QL`
			fragment on TimeSlot {
				id
				time
				quantity
				${UpdateTimeSlotMutation.getFragment('slot')}
			}
		`
	}
});