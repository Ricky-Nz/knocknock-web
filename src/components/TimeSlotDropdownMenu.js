import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class TimeSlotDropdownMenu extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.date !== this.props.date) {
			this.props.relay.setVariables({date: nextProps.date});
		}
	}
	render() {
		const {viewer, select, onSelect} = this.props;

		return (
			<SelectField floatingLabelText='Select Pickup Time' value={select} onChange={onSelect}>
				{
					viewer.timeSlots&&viewer.timeSlots.edges.map(({node}, index) =>
							<MenuItem key={index} value={node} disabled={!node.enabled} primaryText={`${node.start} ~ ${node.end}`}/>)
				}
		  </SelectField>
		);
	}
}

TimeSlotDropdownMenu.propTypes = {
	date: PropTypes.object,
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
							enabled
						}
					}
				}
			}
		`
	}
});