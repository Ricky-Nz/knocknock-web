import React, { Component } from 'react';
import Relay from 'react-relay';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import { CategoryTab, ClothTab } from './components';
import { AddFloatButton } from './widgets';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

class ClothBrowserPage extends Component {
	state = {
		slideIndex: 0
	}
	tabSelectChange = (value) => {
		this.setState({slideIndex: value});
	}
	render() {
		let contentView;
		switch(this.state.slideIndex) {
			case 0:
				contentView = <CategoryTab viewer={this.props.viewer}/>;
				break;
			case 1:
				contentView = <ClothTab viewer={this.props.viewer}/>
				break;
		}

		return (
			<div className='flex flex-fill'>
				<Paper>
		      <Tabs onChange={this.tabSelectChange} value={this.state.slideIndex}>
		        <Tab label='Categories' value={0}/>
		        <Tab label='Items' value={1}/>
		      </Tabs>
	      </Paper>
	      {contentView}
      </div>
		);
	}
}

const component = Relay.createContainer(ClothBrowserPage, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${CategoryTab.getFragment('viewer')}
				${ClothTab.getFragment('viewer')}
			}
		`
	}
});

export default {
	component,
	queries
};

