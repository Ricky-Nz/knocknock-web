import React, { Component } from 'react';
import Relay from 'react-relay';
import VoucherList from './VoucherList';

class UserVoucherTab extends Component {
	render() {
		return (
			<div className='flex flex-fill'>
				<VoucherList connection={this.props.user.vouchers}/>
			</div>
		);
	}
}

export default Relay.createContainer(UserVoucherTab, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				vouchers(first:1000) {
					${VoucherList.getFragment('connection')}
				}
			}
		`
	}
});