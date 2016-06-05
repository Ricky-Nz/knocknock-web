import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';
import { TimeSlotUpdateMutation } from '../mutations';

class TimeSlotListItem extends Component {
	onClick = () => {
		this.props.onClick(this.props.slot);
	}
	render() {
		const { slot } = this.props;
		return (
			<ListItem primaryText={`${slot.start} ~ ${slot.end}`}
				secondaryText={`Limit: ${slot.limit}`} onClick={this.onClick}
				rightToggle={<Toggle toggled={slot.enabled}/>}/>
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
				start
				end
				limit
				enabled
				${TimeSlotUpdateMutation.getFragment('slot')}
			}
		`
	}
});