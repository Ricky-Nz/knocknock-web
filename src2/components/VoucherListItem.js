import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconVoucher from 'material-ui/svg-icons/action/card-giftcard';

const VoucherListItem = ({voucher}) => (
	<Paper className='margin-vertical'>
		<ListItem leftIcon={<IconVoucher/>}
			primaryText={`${voucher.title} $${voucher.value}`} secondaryText={voucher.expireOn}/>
	</Paper>
);

export default Relay.createContainer(VoucherListItem, {
	fragments: {
		voucher: () => Relay.QL`
			fragment on Voucher {
        used
        value
        title
        expireOn
        usedOn
        usedOrderId
			}
		`
	}
});