import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { lightGreen500, amber500 } from 'material-ui/styles/colors';

const CreditListItem = ({credit, onClick}) => (
	<ListItem leftAvatar={<Avatar src={credit.user&&credit.user.avatarUrl}/>}
		primaryText={<div>{`S$${credit.amount}`} <span style={credit.status==1?styles.approved:styles.pennding}>
			{credit.status==1?'Approved':'Pennding'}</span></div>}
		secondaryTextLines={2}
		secondaryText={
			<div>
				<div className='flex flex-row'>
					<div className='flex flex-fill'>Payment Mode</div>
					<div className='flex flex-fill'>Approved At</div>
					<div className='flex flex-fill'>Approved By</div>
					<div className='flex flex-fill'>Created At</div>
				</div>
				<div className='flex flex-row'>
					<div className='flex flex-fill'>{credit.paymentMode}</div>
					<div className='flex flex-fill'>{credit.approvedAt||'n/a'}</div>
					<div className='flex flex-fill'>{credit.approvedBy||'n/a'}</div>
					<div className='flex flex-fill'>{credit.createdAt}</div>
				</div>
			</div>
		} rightIcon={<Subheader style={styles.time}>{`No.${credit.paymentRefNo}`}</Subheader>}/>	
);

CreditListItem.propTypes = {
	onClick: PropTypes.func.isRequired
};

const styles = {
	time: {
		width: 300,
		textAlign: 'right',
		paddingRight: 16,
		margin: 0
	},
	approved: {
		color: lightGreen500
	},
	pennding: {
		color: amber500
	}
};

export default Relay.createContainer(CreditListItem, {
	fragments: {
		credit: () => Relay.QL`
			fragment on CreditRecord {
				id
				user {
					userId
					avatarUrl
					email
				}
				amount
				paymentRefNo
				topUp
				createdAt
				paymentMode
				status
				approvedAt
				approvedBy
				description
			}
		`
	}
});