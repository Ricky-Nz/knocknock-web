import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import { AddFloatButton } from './widgets';
import { TimeSlotListItem } from './components';
import { preparePageParams } from './utils';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

class TimeSlotPage extends Component {
	state = {
		dialogShow: false
	}
	onItemClick = (timeSlot) => {

	}
	onAdd = () => {
		this.setState({dialogShow: true});
	}
	handleClose = () => {
		this.setState({dialogShow: false});
	}
	render() {
		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding margin'>
					<List>
						{
							this.props.viewer.pickupSlots.map((timeSlot, index) =>
								<TimeSlotListItem key={index} timeSlot={timeSlot}/>)
						}
					</List>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
			</div>
		);
	}
}

const styles = {
	floatButton: {
		position: 'absolute',
		right: 24,
		bottom: 24
	}
};

const component = Relay.createContainer(TimeSlotPage, {
	fragments: {
		viewer: (variables) => Relay.QL`
			fragment on Viewer {
				pickupSlots {
					${TimeSlotListItem.getFragment('timeSlot')}
				}
			}
		`
	}
});

export default {
	component,
	queries
};

