import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const TimeSlotDropdownMenu = ({viewer, select, onSelect}) => (
	<SelectField floatingLabelText='Select Pickup Time' value={select} onChange={onSelect}>
		{
			viewer.timeSlots&&viewer.timeSlots.edges.map(({node}, index) =>
					<MenuItem key={index} value={node} primaryText={`${node.start} ~ ${node.end}`}/>)
		}
  </SelectField>
);

TimeSlotDropdownMenu.propTypes = {
	select: PropTypes.object,
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(TimeSlotDropdownMenu, {
	initialVariables: {
		date: null,
		skipLoad: false
	},
	prepareVariables: (variables) => {
		return {
			...variables,
			skipLoad: !variables.date
		};
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				timeSlots(date:$date,first:100) @skip(if: $skipLoad) {
					edges {
						node {
							start
							end
						}
					}
				}
			}
		`
	}
});