import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';
import IconDone from 'material-ui/svg-icons/action/done';
import IconCancel from 'material-ui/svg-icons/content/clear';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import { InputBox } from './widgets';
import { OrderStatusDropdownMenu } from './components';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

class OrderDetailPage extends Component {
	constructor(props) {
		super(props);
		const { status, pickupWorkerId } = this.props.viewer.user.order;
		this.state = {
			editMode: false,
			status,
			pickupWorkerId
		};
	}
	onSelectStatus = (event, index, status) => {

	}
	onNavBack = () => {
		this.context.router.goBack();
	}
	onEdit = () => {
		this.setState({editMode: true});
	}
	onCancel = () => {
		this.setState({editMode: false});
	}
	onSubmit = () => {

	}
	render() {
		const { editMode, status, pickupWorkerId } = this.state;
		const user = this.props.viewer.user;
		const order = this.props.viewer.user.order;

		return (
			<div className='flex flex-fill'>
				<AppBar title={`Order: ${order.serialNumber}`}
					iconElementLeft={<IconButton onClick={this.onNavBack}><IconBack/></IconButton>}/>
				<div className='flex flex-fill position-relative'>
					<div className='flex flex-fill padding scroll margin-horizontal'>
						<div className='flex flex-row flex-align-center'>
							<div className='margin-right'>Order Status:</div>
							{
								editMode?(
									<OrderStatusDropdownMenu viewer={this.props.viewer} disabled={!editMode}
										select={status} onSelect={this.onSelectStatus}/>
								):<p>{order.status}</p>
							}
						</div>
						<div className='flex flex-row flex-align-center'>
							<div className='margin-right'>Order User:</div>
							<div className='flex flex-center flex-align-center'>
								<Avatar src={user.avatarUrl} size={80}/>
								<Subheader>{user.name}</Subheader>
							</div>
						</div>
					</div>
					{editMode?
						<div className='flex flex-row' style={styles.floatButton}>
							<FloatingActionButton onClick={this.onCancel}>
								<IconCancel/>
							</FloatingActionButton>
							<FloatingActionButton className='margin-left' onClick={this.onSubmit}>
								<IconDone/>
							</FloatingActionButton>
						</div>:
						<FloatingActionButton style={styles.floatButton} onClick={this.onEdit}>
							<IconEditor/>
						</FloatingActionButton>
					}
				</div>
			</div>
		);
	}
}

OrderDetailPage.contextProps = {
	router: PropTypes.object.isRequired
};

const styles = {
	floatButton: {
		position: 'absolute',
		right: 24,
		bottom: 24
	}
};

					// <InputBox ref='nameEn' value={cloth&&cloth.nameEn} floatingLabelText='English Name'
	    //     	verify='notempty' errorText='english name can not be empty'/>
const component = Relay.createContainer(OrderDetailPage, {
	initialVariables: {
		userId: null,
		orderId: null
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				user(id:$userId) {
					name
					contact
					avatarUrl
					order(serialNumber:$orderId) {
						express
						note
						status
						pickupDate
						pickupTime
						pickupAddress
						pickupWorkerId
						serialNumber
						totalPrice
					}
				}
				${OrderStatusDropdownMenu.getFragment('viewer')}
			}
		`
	}
});

export default {
	component,
	queries
};