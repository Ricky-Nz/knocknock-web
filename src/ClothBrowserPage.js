import React, { Component } from 'react';
import Relay from 'react-relay';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import { CategoryTab, ClothTab } from './components';
import { AddFloatButton } from './widgets';

class ClothBrowserPage extends Component {
	state = {
		slideIndex: 0,
		selectCategoryId: null
	}
	tabSelectChange = (value) => {
		this.setState({slideIndex: value});
	}
	onSelectCategory = (category) => {
		this.setState({slideIndex: 1, selectCategoryId: category.id});	
	}
	render() {
		let contentView;
		switch(this.state.slideIndex) {
			case 0:
				contentView = <CategoryTab viewer={this.props.viewer}
					onSelectCategory={this.onSelectCategory}/>;
				break;
			case 1:
				contentView = <ClothTab viewer={this.props.viewer}
					defaultCategoryId={this.state.selectCategoryId}/>
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

export default Relay.createContainer(ClothBrowserPage, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${CategoryTab.getFragment('viewer')}
				${ClothTab.getFragment('viewer')}
			}
		`
	}
});

