import React, { Component } from 'react';
import Relay from 'react-relay';
import CreditList from './CreditList';

class UserCreditTab extends Component {
	onSelect = () => {

	}
	render() {
		return (
			<div className='flex flex-fill'>
				<CreditList connection={this.props.user.transactions} onSelect={this.onSelect}/>
			</div>
		);
	}
}

export default Relay.createContainer(UserCreditTab, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				transactions(first:1000) {
					${CreditList.getFragment('connection')}
				}
			}
		`
	}
});