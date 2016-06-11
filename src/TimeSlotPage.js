import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import { TimeSlotDialog, TimeSlotList } from './components';
import InfiniteCalendar from 'react-infinite-calendar';

class TimeSlotPage extends Component {
	state = {
		dialogShow: false,
		selectSlot: null,
		loading: false
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
	onSelectDate = (date) => {
		this.props.relay.setVariables({date: date.toDate()}, this.onReadyStateChange);
	}
	onReadyStateChange = ({done}) => {
		this.setState({loading: !done});
	}
	render() {
		const { dialogShow, selectSlot, loading } = this.state;

		return (
			<div className='flex flex-fill'>
	      <div className='flex flex-row flex-fill padding'>
					<InfiniteCalendar onSelect={this.onSelectDate}/>
					<div className='flex flex-fill padding-left'>
						<Subheader>Time Slots</Subheader>
						{loading&&
							<div className='flex flex-align-center padding'>
								<CircularProgress size={0.5}/>
							</div>
						}
						{!loading&&this.props.viewer.timeSlots&&
							<TimeSlotList connection={this.props.viewer.timeSlots}
								onSelect={this.onSelectSlot}/>
						}
					</div>
	      </div>
				<TimeSlotDialog open={dialogShow} date={this.props.relay.variables.date}
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
