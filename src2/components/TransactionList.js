import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import TransactionListItem from './TransactionListItem';

const TransactionList = ({connection}) => (
	<List>
		{
			connection.edges.map(({node}, index) =>
				<TransactionListItem key={index} transaction={node}/>)
		}
	</List>
);

export default Relay.createContainer(TransactionList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on TransactionConnection {
				edges {
					node {
						${TransactionListItem.getFragment('transaction')}
					}
				}
			}
		`
	}
})