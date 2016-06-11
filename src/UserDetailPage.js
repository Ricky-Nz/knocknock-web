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
import { UserDetailTab, UserOrderTab, UserVoucherTab, UserCreditTab,
	OrderCreateDialog } from './components';

class UserDetailPage extends Component {
	state = {
		dialogShow: false,
		selectTab: 'detail'
	}
	tabSelectChange = (value) => {
		this.setState({selectTab: value});
	}
	onNavBack = () => {
		this.context.router.goBack();
	}
	onNewOrder = () => {
		this.setState({dialogShow: true});
	}
	handleClose = () => {
		this.setState({dialogShow: false});
	}
	render() {
		const user = this.props.viewer.user;
		let contentView;
		switch(this.state.selectTab) {
			case 'detail':
				contentView = <UserDetailTab user={user}/>
				break;
			case 'voucher':
				contentView = <UserVoucherTab user={user}/>
				break;
			case 'credit':
				contentView = <UserCreditTab user={user}/>
				break;
			case 'order':
				contentView = <UserOrderTab user={user} onNewOrder={this.onNewOrder}/>
				break;
		}

		return (
			<div className='flex flex-fill'>
				<AppBar title={`${user.firstName||''} ${user.lastName||''}`}
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
				<OrderCreateDialog handleClose={this.handleClose} open={this.state.dialogShow}
					viewer={this.props.viewer} user={user}/>
			</div>
		);
	}
}

UserDetailPage.contextTypes = {
	router: PropTypes.object.isRequired
};

const styles = {
	tabBar: {
		width: 300
	}
};

export default Relay.createContainer(UserDetailPage, {
	initialVariables: {
		id: null
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				${OrderCreateDialog.getFragment('viewer')}
				user(id:$id) {
					firstName
					lastName
					${UserDetailTab.getFragment('user')}
					${UserCreditTab.getFragment('user')}
					${UserVoucherTab.getFragment('user')}
					${UserOrderTab.getFragment('user')}
					${OrderCreateDialog.getFragment('user')}
				}
			}
		`
	}
});

