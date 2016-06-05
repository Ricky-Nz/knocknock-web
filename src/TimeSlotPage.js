import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import DatePicker from 'material-ui/DatePicker';
import SubHeader from 'material-ui/SubHeader';
import { Tabs, Tab } from 'material-ui/Tabs';
import { AddFloatButton } from './widgets';
import { TimeSlotTemplateDialog, TimeSlotDialog, TimeSlotTemplateList, TimeSlotList } from './components';

class TimeSlotPage extends Component {
	state = {
		selectTab: 'date',
		dialogShow: false,
		slotDialogShow: false,
		selectTemplate: null,
		selectSlot: null
	}
	onNavBack = () => {
		this.context.router.goBack();
	}
	tabSelectChange = (value) => {
		this.setState({selectTab: value});
	}
	onAdd = () => {
		this.setState({dialogShow: true});
	}
	handleClose = () => {
		this.setState({dialogShow: false, selectTemplate: null});
	}
	handleSlotClose = () => {
		this.setState({slotDialogShow: false, selectSlot: null});	
	}
	onSelectTemplate = (tempalte) => {
		this.setState({dialogShow: true, selectTemplate: tempalte});
	}
	onSelectSlot = (slot) => {
		this.setState({slotDialogShow: true, selectSlot: slot});
	}
	onPickDate = (_, date) => {
		this.props.relay.setVariables({date});
	}
	render() {
		const { dialogShow, slotDialogShow, selectSlot, selectTemplate } = this.state;

		let contentView = null;
		switch(this.state.selectTab) {
			case 'date':
				contentView = (
					<div className='flex flex-row'>
						<DatePicker hintText='pick date' container='inline'
							onChange={this.onPickDate}/>
						<div className='flex flex-fill padding-left'>
							<SubHeader>Time Slots</SubHeader>
							{this.props.viewer.timeSlots&&
								<TimeSlotList connection={this.props.viewer.timeSlots}
									onSelect={this.onSelectSlot}/>
							}
						</div>
					</div>
				);
				break;
			case 'default':
				contentView = (
					<div className='flex'>
						<SubHeader>Default Time Slots</SubHeader>
						<TimeSlotTemplateList connection={this.props.viewer.timeSlotTemplates}
							onSelect={this.onSelectTemplate}/>
					</div>
				);
				break;
		}

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill'>
		      <Tabs onChange={this.tabSelectChange} value={this.state.selectTab}>
		        <Tab label='Date Browser' value='date'/>
		        <Tab label='Defualt Setting' value='default'/>
		      </Tabs>
		      <div className='flex flex-fill padding'>
		      	{contentView}
		      </div>
				</div>
				{this.state.selectTab==='default'&&
					<AddFloatButton className='page-float-button' onClick={this.onAdd}/>
				}
				<TimeSlotTemplateDialog viewer={this.props.viewer} open={dialogShow}
					handleClose={this.handleClose} template={selectTemplate}/>
				<TimeSlotDialog open={slotDialogShow}
					handleClose={this.handleSlotClose} slot={selectSlot}/>
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
				timeSlotTemplates(first:100) {
					${TimeSlotTemplateList.getFragment('connection')}
				}
				timeSlots(date:$date,first:100) @skip(if: $skipFetch) {
					${TimeSlotList.getFragment('connection')}
				}
				${TimeSlotTemplateDialog.getFragment('viewer')}
			}
		`
	}
});
