import React, { Component } from 'react';
import Relay from 'react-relay';
import TransactionList from './TransactionList';

class UserTransactionTab extends Component {
	render() {
		return (
			<div className='flex flex-fill'>
				<TransactionList connection={this.props.user.transactions}/>
			</div>
		);
	}
}

export default Relay.createContainer(UserTransactionTab, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				transactions(first:1000) {
					${TransactionList.getFragment('connection')}
				}
			}
		`
	}
});