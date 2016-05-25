import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import OrderList from './OrderList';
import { AddFloatButton } from '../widgets';

class UserOrderTab extends Component {
	onNewOrder = () => {
		this.context.router.push({
			pathname: `/dashboard/order`
		});
	}
	render() {
		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex scroll'>
					<OrderList connection={this.props.user.orders}/>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onNewOrder}/>
			</div>
		);
	}
}

UserOrderTab.propTypes = {
	router: PropTypes.object.isRequired
};

const styles = {
	floatButton: {
		position: 'absolute',
		right: 36,
		bottom: 36
	}
};

export default Relay.createContainer(UserOrderTab, {
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				orders(first:1000) {
					${OrderList.getFragment('connection')}
				}
			}
		`
	}
});