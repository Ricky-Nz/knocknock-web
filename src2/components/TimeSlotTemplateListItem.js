import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';

const TimeSlotTemplateListItem = ({template, onClick}) => (
	<ListItem primaryText={`${template.start} ~ ${template.end}`}
		secondaryText={`Limit: ${template.limit}`}
		onTouchTap={() => onClick(template)} rightIcon={<IconEditor/>}/>
);

TimeSlotTemplateListItem.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default Relay.createContainer(TimeSlotTemplateListItem, {
	fragments: {
		template: () => Relay.QL`
			fragment on TimeSlotTemplate {
				id
				start
				end
				limit
			}
		`
	}
});