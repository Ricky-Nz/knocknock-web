import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Tabs, Tab } from 'material-ui/Tabs';
import { OrderOverviewTab, OrderItemTab } from './components';

class OrderDetailPage extends Component {
	state = {
		selectTab: 'overview'
	}
	onNavBack = () => {
		this.context.router.goBack();
	}
	onTabSelectChange = (value) => {
		this.setState({selectTab: value});
	}
	render() {
		let contentView = null;
		switch(this.state.selectTab) {
			case 'overview':
				contentView = <OrderOverviewTab user={this.props.viewer.user}
					viewer={this.props.viewer} order={this.props.viewer.user.order}/>;
				break;
			case 'items':
				contentView = <OrderItemTab order={this.props.viewer.user.order}/>;
				break;
		}

		return (
			<div className='flex flex-fill'>
				<AppBar title={`Order: ${this.props.params.orderId}`} zDepth={0}
					iconElementLeft={<IconButton onClick={this.onNavBack}><IconBack/></IconButton>}/>
	      <Tabs onChange={this.onTabSelectChange} value={this.state.selectTab}>
	        <Tab label='Overview' value='overview'/>
	        <Tab label='Order Items' value='items'/>
	        <Tab label='Change Record' value='record'/>
	      </Tabs>
	      {contentView}
			</div>
		);
	}
}

OrderDetailPage.contextTypes = {
	router: PropTypes.object.isRequired
};

export default Relay.createContainer(OrderDetailPage, {
	initialVariables: {
		userId: null,
		orderId: null
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				user(id:$userId) {
					${OrderOverviewTab.getFragment('user')}
					order(serialNumber:$orderId) {
						${OrderOverviewTab.getFragment('order')}
						${OrderItemTab.getFragment('order')}
					}
				}
				${OrderOverviewTab.getFragment('viewer')}
			}
		`
	}
});

