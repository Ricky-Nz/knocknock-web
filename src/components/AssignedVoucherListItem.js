import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';

const AssignedVoucherListItem = ({assigned, onClick}) => (
	<Paper className='margin-bottom'>
		<ListItem primaryText={assigned.voucher.title} onClick={() => onClick(assigned)}
			secondaryTextLines={2} secondaryText={
				<div>
					<div>{`Value: S$${assigned.voucher.value}`}</div>
					<div>{`Expired on: ${assigned.voucher.displayExpireOn}`}</div>
				</div>
			} rightIcon={<Subheader style={styles.status}>{assigned.used?'Used':'Active'}</Subheader>}/>
	</Paper>
);

const styles = {
	status: {
		margin: 0,
		width: 70,
		paddingRight: 16
	}
};

export default Relay.createContainer(AssignedVoucherListItem, {
	fragments: {
		assigned: () => Relay.QL`
			fragment on AssignedVoucher {
				used
				createdAt
				voucher {
	        title
	        value
	        displayExpireOn
				}
			}
		`
	}
});