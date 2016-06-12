import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import OrderListItem from './OrderListItem';
import { UpdateOrderMutation } from '../mutations';

class OrderList extends Component {
	state = {
		selectOrders: []
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.toggleAll !== this.props.toggleAll) {
			let selectOrders = []
			if (nextProps.toggleAll) {
				selectOrders = nextProps.connection.edges.map(({node}) => node);
			}

			this.setState({selectOrders});
			this.props.onSelect(selectOrders);
		}
	}
	onSelectOrder = (order) => {
		const {node: selectNode} = this.props.connection.edges.find(({node}) => node.id === order.id);

		const index = this.state.selectOrders.indexOf(selectNode);
		let newSelects;
		if (index >= 0) {
			newSelects = [...this.state.selectOrders.slice(0, index),
				...this.state.selectOrders.slice(index + 1)];
		} else {
			newSelects = [...this.state.selectOrders, selectNode]
		}
		this.setState({selectOrders: newSelects});
		this.props.onSelect(newSelects);
	}
	render() {
		const {connection, selectMode, onSelect} = this.props;
		const selectOrders = this.state.selectOrders;

		return (
			<List className='scroll'>
				{
					connection.edges.map(({node}, index) => {
						const selectIndex = selectMode&&selectOrders&&selectOrders.findIndex(order => order.id === node.id);
						return (
							<Paper key={index} className='margin-bottom' style={styles.fix}>
								<OrderListItem order={node} selectMode={selectMode}
									select={selectIndex>=0} onClick={selectMode?this.onSelectOrder:this.props.onSelect}/>
							</Paper>
						)
					})
				}
			</List>
		);
	}
}

OrderList.propTypes = {
	onSelect: PropTypes.func.isRequired,
	selectMode: PropTypes.bool,
	toggleAll: PropTypes.bool
};

const styles = {
	fix: {
		marginLeft: 2,
		marginRight: 2
	}
};

export default Relay.createContainer(OrderList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on OrderConnection {
				edges {
					node {
						id
						displayId
						${OrderListItem.getFragment('order')}
						${UpdateOrderMutation.getFragment('order')}
					}
				}
			}
		`
	}
})