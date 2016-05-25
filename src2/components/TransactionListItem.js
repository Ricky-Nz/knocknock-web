import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import IconMoney from 'material-ui/svg-icons/editor/monetization-on';

const TransactionListItem = ({transaction}) => (
	<Paper className='margin-vertical'>
		<ListItem leftIcon={<IconMoney/>}
			primaryText={`${transaction.type} $${transaction.value}`} secondaryText={transaction.description}/>
	</Paper>
);

export default Relay.createContainer(TransactionListItem, {
	fragments: {
		transaction: () => Relay.QL`
			fragment on Transaction {
        value
        type
        description
        orderId
			}
		`
	}
});