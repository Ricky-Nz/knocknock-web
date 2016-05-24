import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconNavBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Tabs, Tab } from 'material-ui/Tabs';
import { AddFloatButton } from './widgets';
import { UserDetailTab } from './components';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

const prepareParams = (params, {location}) => {
	return {
		role: params.role,
		id: params.id
	};
};

class UserDetailPage extends Component {
	state = {
		selectTab: 'detail'
	}
	tabSelectChange = (value) => {
		this.setState({selectTab: value});
	}
	onBack = () => {
		this.context.router.goBack();
	}
	render() {
		let contentView;
		switch(this.state.selectTab) {
			case 'detail':
				contentView = <UserDetailTab user={this.props.viewer.user}/>
				break;
		}

		return (
			<div className='flex flex-fill'>
				<Paper>
		      <Tabs onChange={this.tabSelectChange} value={this.state.selectTab}>
		        <Tab label='User Details' value='detail'/>
		        <Tab label='Order Record' value='order'/>
		        <Tab label='Deposit Record' value='deposit'/>
		        <Tab label='User Vouchers' value='voucher'/>
		      </Tabs>
	      </Paper>
	      <div className='flex flex-fill position-relative'>
	      	{contentView}
					<FloatingActionButton backgroundColor='white'
						style={styles.floatBack} onClick={this.onBack}>
					  <IconNavBack/>
					</FloatingActionButton>
	      </div>
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
					${UserDetailTab.getFragment('user')}
				}
			}
		`
	}
});

export default {
	component,
	queries,
	prepareParams
};

