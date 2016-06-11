import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';

const VoucherListItem = ({voucher, onClick}) => (
	<Paper className='margin-bottom'>
		<ListItem primaryText={voucher.title} onClick={() => onClick(voucher)}
			secondaryTextLines={2} secondaryText={
				<div>
					<div>{`Value: S$${voucher.value}`}</div>
					<div>{`Expired on: ${voucher.displayExpireOn}`}</div>
				</div>
			} rightToggle={<Toggle toggled={voucher.enabled}/>}/>
	</Paper>
);

export default Relay.createContainer(VoucherListItem, {
	fragments: {
		voucher: () => Relay.QL`
			fragment on Voucher {
				id
        title
        value
        displayExpireOn
        enabled
			}
		`
	}
});