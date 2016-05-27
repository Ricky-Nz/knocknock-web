import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconNavBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Tabs, Tab } from 'material-ui/Tabs';
import { UserInputAutoComplete, AddressDropdownMenu } from './components';
import IconDone from 'material-ui/svg-icons/action/done';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

const prepareParams = (params, {location}) => {
	return {
		userId: params.userId||null,
		orderId: params.orderId||null
	};
};

class OrderDetailPage extends Component {
	onBack = () => {
		this.context.router.goBack();
	}
	onSelectUser = (user) => {
		this.props.relay.setVariables({selectUserId: user.id});
	}
	render() {
		const { userId, orderId } = this.props.params;
		const order = this.props.viewer.order;

		return (
			<div className='flex flex-fill'>
			  <AppBar title={order?order.id:'New Order'}
			    iconElementLeft={<IconButton onClick={this.onBack}><IconBack/></IconButton>}
			    iconElementRight={<IconButton><IconDone/></IconButton>}/>
				<div className='flex flex-fill padding scroll margin'>
					{!userId&&<UserInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectUser}/>}
					{(userId||this.props.relay.variables.selectUserId)&&
						<div>
							<AddressDropdownMenu user={this.props.viewer.user}/>
							<DatePicker hintText='Select Pickup Date' mode='landscape'/>
						</div>
					}
				</div>
			</div>
		);
	}
}

OrderDetailPage.contextTypes = {
	router: PropTypes.object.isRequired
};

const component = Relay.createContainer(OrderDetailPage, {
	initialVariables: {
		userId: null,
		orderId: null,
		selectUserId: null,
		fetchUserList: false,
		skipFetchUser: true,
		skipFetchOrder: true
	},
	prepareVariables: (variables) => {
		return {
			...variables,
			fetchUserList: !variables.userId,
			userId: variables.userId || variables.selectUserId,
			skipFetchUser: !variables.userId && !variables.selectUserId,
			skipFetchOrder: !variables.orderId
		};
	},
	fragments: {
		viewer: (variables) => Relay.QL`
			fragment on Viewer {
				${UserInputAutoComplete.getFragment('viewer').if(variables.fetchUserList)}
				user(id:$userId) @skip(if: $skipFetchUser) {
					order(id:$orderId) @skip(if: $skipFetchOrder) {
						id
					}
					${AddressDropdownMenu.getFragment('user')}
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

