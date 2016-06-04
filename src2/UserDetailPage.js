import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconNavBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Tabs, Tab } from 'material-ui/Tabs';
import { AddFloatButton } from './widgets';
import { UserDetailTab, UserOrderTab, UserVoucherTab, UserCreditTab } from './components';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

class UserDetailPage extends Component {
	state = {
		selectTab: 'detail'
	}
	tabSelectChange = (value) => {
		this.setState({selectTab: value});
	}
	onNavBack = () => {
		this.context.router.goBack();
	}
	render() {
		let contentView;
		switch(this.state.selectTab) {
			case 'detail':
				contentView = <UserDetailTab user={this.props.viewer.user}/>
				break;
			case 'voucher':
				contentView = <UserVoucherTab user={this.props.viewer.user}/>
				break;
			case 'credit':
				contentView = <UserCreditTab user={this.props.viewer.user}/>
				break;
			case 'order':
				contentView = <UserOrderTab user={this.props.viewer.user}/>
				break;
		}

		return (
			<div className='flex flex-fill'>
				<AppBar title={this.props.viewer.user.name}
					iconElementLeft={<IconButton onClick={this.onNavBack}><IconBack/></IconButton>}>
		      <Tabs onChange={this.tabSelectChange} value={this.state.selectTab}
		      	style={styles.tabBar}>
		        <Tab label='Detail' value='detail'/>
		        <Tab label='Credit' value='credit'/>
		        <Tab label='Voucher' value='voucher'/>
		        <Tab label='Order' value='order'/>
		      </Tabs>
				</AppBar>
	      {contentView}
			</div>
		);
	}
}

UserDetailPage.contextTypes = {
	router: PropTypes.object.isRequired
};

const styles = {
	floatBack: {
		position: 'absolute',
		left: 24,
		bottom: 24
	},
	tabBar: {
		width: 300
	}
};

const component = Relay.createContainer(UserDetailPage, {
	initialVariables: {
		id: null
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
				user(id:$id) {
					name
					${UserDetailTab.getFragment('user')}
					${UserOrderTab.getFragment('user')}
					${UserCreditTab.getFragment('user')}
					${UserVoucherTab.getFragment('user')}
				}
			}
		`
	}
});

export default {
	component,
	queries
};

