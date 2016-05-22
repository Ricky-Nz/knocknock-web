import React, { Component } from 'react';
import Relay from 'react-relay';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import { CategoryList, ClothList, ClothDialog } from './components';
import { AddFloatButton } from './widgets';
import { preparePageParams } from './common';
import { DeleteClothMutation } from './mutations';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

const prepareParams = (params, {location}) => {
	return preparePageParams(location);
};

class ClothPage extends Component {
	state = {
		slideIndex: 0
	}
	onAdd = () => {
		this.setState({open: true});
	}
	tabSelectChange = (value) => {
		this.setState({slideIndex: value});
	}
	render() {
		let contentView;

		switch(this.state.slideIndex) {
			case 0:
				contentView = (
					<div className='flex flex-fill position-relative'>
						<div className='flex flex-fill scroll padding'>
							<CategoryList viewer={this.props.viewer}/>
						</div>
						<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
					</div>
				);
				break;
			case 1:
				contentView = (
					<div className='flex flex-fill position-relative'>
						<div className='flex flex-fill scroll padding'>
							<ClothList viewer={this.props.viewer}/>
						</div>
						<ClothDialog viewer={this.props.viewer}/>
						<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
					</div>
				);
				break;
		}

		return (
			<div className='flex flex-fill'>
				<Paper>
		      <Tabs onChange={this.tabSelectChange}
		        value={this.state.slideIndex}>
		        <Tab label='Categories' value={0}/>
		        <Tab label='Items' value={1}/>
		      </Tabs>
	      </Paper>
	      {contentView}
      </div>
		);
	}
}

const styles = {
	floatButton: {
		position: 'absolute',
		right: 48,
		bottom: 48
	}
};

const component = Relay.createContainer(ClothPage, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${CategoryList.getFragment('viewer')}
				${ClothList.getFragment('viewer')}
				${ClothDialog.getFragment('viewer')}
			}
		`
	}
});

export default {
	component,
	queries,
	prepareParams
};

