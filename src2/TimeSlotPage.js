import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Tabs, Tab } from 'material-ui/Tabs';
import { AddFloatButton } from './widgets';
import { TimeSlotTemplateDialog, TimeSlotTemplateList } from './components';
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
		selectTab: 'default',
		dialogShow: false,
		selectTemplate: null
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
	onSelectTemplate = (tempalte) => {
		this.setState({dialogShow: true, selectTemplate: tempalte});
	}
	render() {
		const { dialogShow, selectTemplate } = this.state;

		let contentView = null;
		switch(this.state.selectTab) {
			case 'date':
				break;
			case 'default':
				contentView = <TimeSlotTemplateList connection={this.props.viewer.timeSlotTempaltes}
					onSelect={this.onSelectTemplate}/>;
				break;
		}

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill'>
		      <Tabs onChange={this.tabSelectChange} value={this.state.selectTab}>
		        <Tab label='Date Browser' value='date'/>
		        <Tab label='Defualt Setting' value='default'/>
		      </Tabs>
				</div>
				{contentView}
				<AddFloatButton className='page-float-button' onClick={this.onAdd}/>
				<TimeSlotTemplateDialog viewer={this.props.viewer} open={dialogShow}
					handleClose={this.handleClose} template={selectTemplate}/>
			</div>
		);
	}
}

const component = Relay.createContainer(TimeSlotPage, {
	fragments: {
		viewer: (variables) => Relay.QL`
			fragment on Viewer {
				timeSlotTempaltes(first:100) {
					${TimeSlotTemplateList.getFragment('connection')}
				}
				${TimeSlotTemplateDialog.getFragment('viewer')}
			}
		`
	}
});

export default {
	component,
	queries
};

