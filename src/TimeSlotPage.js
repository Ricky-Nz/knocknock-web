import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import { TimeSlotDialog, TimeSlotList } from './components';

class TimeSlotPage extends Component {
	state = {
		dialogShow: false,
		selectSlot: null
	}
	onAdd = () => {
		this.setState({dialogShow: true, selectSlot: null});
	}
	handleClose = () => {
		this.setState({dialogShow: false});
	}
	onSelectSlot = (slot) => {
		this.setState({dialogShow: true, selectSlot: slot});
	}
	onPickDate = (_, date) => {
		this.props.relay.setVariables({date});
	}
	render() {
		const { dialogShow, selectSlot } = this.state;

		return (
			<div className='flex flex-fill'>
	      <div className='flex flex-row flex-fill padding'>
					<DatePicker hintText='pick date' container='inline'
						onChange={this.onPickDate}/>
					<div className='flex flex-fill padding-left'>
						<Subheader>Time Slots</Subheader>
						{this.props.viewer.timeSlots&&
							<TimeSlotList connection={this.props.viewer.timeSlots}
								onSelect={this.onSelectSlot}/>
						}
					</div>
	      </div>
				<TimeSlotDialog open={dialogShow}
					handleClose={this.handleClose} slot={selectSlot}/>
			</div>
		);
	}
}

export default Relay.createContainer(TimeSlotPage, {
	initialVariables: {
		date: null,
		skipFetch: true
	},
	prepareVariables: (variables) => {
		return {
			...variables,
			skipFetch: !variables.date
		};
	},
	fragments: {
		viewer: (variables) => Relay.QL`
			fragment on Viewer {
				timeSlots(date:$date,first:100) @skip(if: $skipFetch) {
					${TimeSlotList.getFragment('connection')}
				}
			}
		`
	}
});
