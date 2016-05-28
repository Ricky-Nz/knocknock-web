import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconNavBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Tabs, Tab } from 'material-ui/Tabs';
import { UserInputAutoComplete, AddressDropdownMenu, ClothInputAutoComplete,
	OrderStatusDropdownMenu, TimeSlotDropdownMenu, WorkerInputAutoComplete } from './components';
import IconDone from 'material-ui/svg-icons/action/done';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

class OrderCreatePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: null,
			pickupDate: null,
			status: null,
			pickupTime: null,
			pickupWorkerId: null,
			clothes: []
		};
	}
	onBack = () => {
		this.context.router.goBack();
	}
	onSelectUser = (user) => {
		this.props.relay.setVariables({userId: user.id});
	}
	onSelectWorker = (worker) => {
		this.setState({pickupWorkerId: worker.id});	
	}
	onSelectAddress = (event, index, value) => {
		this.setState({address: value});
	}
	onSelectPickupDate = (_, date) => {
		this.setState({pickupDate: date});
	}
	onSelectPickupTime = (event, index, value) => {
		this.setState({pickupTime: value});
	}
	onSelectStatus = (event, index, value) => {
		this.setState({status: value});
	}
	onSelectProduct = (event, index, value) => {
		this.setState({clothes: [value, ...this.state.clothes]});
	}
	render() {
		const { address, status, pickupTime } = this.state;
		const useId = this.props.relay.variables.userId;

		return (
			<div className='flex flex-fill'>
			  <AppBar title='New Order'
			    iconElementLeft={<IconButton onClick={this.onBack}><IconBack/></IconButton>}/>
				<div className='flex flex-fill padding scroll'>
					<div className='flex flex-row'>
						<Paper className='flex padding'>
							<UserInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectUser}/>
							<AddressDropdownMenu user={this.props.viewer.user||null} disabled={!useId}
								select={address} onSelect={this.onSelectAddress}/>
							<DatePicker hintText='Select Pickup Date' mode='landscape'
								onChange={this.onSelectPickupDate}/>
							<TimeSlotDropdownMenu viewer={this.props.viewer} select={pickupTime}
								onSelect={this.onSelectPickupTime}/>
							<OrderStatusDropdownMenu viewer={this.props.viewer} select={status}
								onSelect={this.onSelectStatus}/>
							<WorkerInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectWorker}/>
						</Paper>
						<div className='flex flex-fill margin-left'>
							<Paper className='padding-horizontal'>
								<ClothInputAutoComplete viewer={this.props.viewer} onSelect={this.onSelectProduct}/>
							</Paper>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

OrderCreatePage.contextTypes = {
	router: PropTypes.object.isRequired
};

const component = Relay.createContainer(OrderCreatePage, {
	initialVariables: {
		userId: null,
		skipFetchUser: true
	},
	prepareVariables: (variables) => {
		return {
			...variables,
			skipFetchUser: !variables.userId
		};
	},
	fragments: {
		viewer: (variables) => Relay.QL`
			fragment on Viewer {
				${UserInputAutoComplete.getFragment('viewer')}
				${OrderStatusDropdownMenu.getFragment('viewer')}
				${TimeSlotDropdownMenu.getFragment('viewer')}
				${WorkerInputAutoComplete.getFragment('viewer')}
				${ClothInputAutoComplete.getFragment('viewer')}
				user(id:$userId) @skip(if: $skipFetchUser) {
					${AddressDropdownMenu.getFragment('user')}
				}
			}
		`
	}
});

export default {
	component,
	queries
};

