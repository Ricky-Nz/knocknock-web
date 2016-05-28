import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import { AddFloatButton } from './widgets';
import { TimeSlotDialog, TimeSlotDeleteDialog, TimeSlotListItem } from './components';
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
		deleteDialogShow: false,
		dialogShow: false,
		selectSlot: null
	}
	onItemAction = (timeSlot, action) => {
		switch(action) {
			case 'DELETE':
				this.setState({deleteDialogShow: true, selectSlot: timeSlot});
				break;
			case 'EDIT':
				this.setState({dialogShow: true, selectSlot: timeSlot});
				break;
		}
	}
	onAdd = () => {
		this.setState({dialogShow: true});
	}
	handleClose = () => {
		this.setState({dialogShow: false, selectSlot: null});
	}
	handleDeleteClose = () => {
		this.setState({deleteDialogShow: false, selectSlot: null});
	}
	render() {
		const { deleteDialogShow, dialogShow, selectSlot } = this.state;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding margin'>
					<List>
						{
							this.props.viewer.timeSlots.edges.map(({node}, index) =>
								<TimeSlotListItem key={index} timeSlot={node} onAction={this.onItemAction}/>)
						}
					</List>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
				<TimeSlotDialog open={dialogShow} handleClose={this.handleClose}
					timeSlot={selectSlot} viewer={this.props.viewer}/>
				<TimeSlotDeleteDialog open={deleteDialogShow} handleClose={this.handleDeleteClose}
					timeSlot={selectSlot} viewer={this.props.viewer}/>
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
				timeSlots(first: 100) {
					edges {
						node {
							${TimeSlotListItem.getFragment('timeSlot')}
						}
					}
				}
				${TimeSlotDialog.getFragment('viewer')}
				${TimeSlotDeleteDialog.getFragment('viewer')}
			}
		`
	}
});

export default {
	component,
	queries
};

