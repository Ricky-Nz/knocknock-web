import React, { Component } from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';
import IconClear from 'material-ui/svg-icons/content/clear';
import IconDone from 'material-ui/svg-icons/action/done';
import { InputBox } from '../widgets';

class UserDetailTab extends Component {
	state = {
		editMode: false
	}
	onEdit = () => {
		this.setState({editMode: true});
	}
	onExitEdit = () => {
		this.setState({editMode: false});
	}
	render() {
		const editMode = this.state.editMode;
		const { email, name, contact, emailVerified, contactVerified, avatarUrl } = this.props.user;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex scroll padding'>
					<div className='flex flex-row'>
						<div className='padding'>
							<Avatar src={avatarUrl} size={100}/>
						</div>
						<div className='flex flex-fill margin-left'>
			        <InputBox ref='email' value={email} disabled={!editMode} floatingLabelText='Email'
			        	verify='email' errorText='please enter a valid email address'/>
			        <InputBox ref='name' value={name} disabled={!editMode} floatingLabelText='Name'/>
			        <InputBox ref='contact' value={contact} disabled={!editMode} floatingLabelText='Contact'/>
						</div>
					</div>
				</div>
				{editMode?
					<div className='flex flex-row' style={styles.floatBottomRight}>
						<FloatingActionButton onClick={this.onExitEdit}>
						  <IconClear/>
						</FloatingActionButton>
						<FloatingActionButton style={styles.marginLeft}>
						  <IconDone/>
						</FloatingActionButton>
					</div> :
					<FloatingActionButton style={styles.floatBottomRight} onClick={this.onEdit}>
					  <IconEditor/>
					</FloatingActionButton>
				}
			</div>
		);
	}
}

const styles = {
	floatBottomRight: {
		position: 'absolute',
		right: 24,
		bottom: 24
	},
	marginLeft: {
		marginLeft: 24
	}
};

export default Relay.createContainer(UserDetailTab, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				id
				role
				email
				name
				contact
				avatarUrl
				emailVerified
				contactVerified
			}
		`
	}
});