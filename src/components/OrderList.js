import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import OrderListItem from './OrderListItem';

class OrderList extends Component {
	state = {
		selectIds: []
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.toggleAll !== this.props.toggleAll) {
			let selectIds = []
			if (nextProps.toggleAll) {
				selectIds = nextProps.connection.edges.map(({node}) => node.id);
			}

			this.setState({selectIds});
			this.props.onSelect(selectIds);
		}
	}
	onSelectOrder = (order) => {
		const index = this.state.selectIds.indexOf(order.id);
		if (index >= 0) {
			this.setState({selectIds: [...this.state.selectIds.slice(0, index),
				...this.state.selectIds.slice(index + 1)]});
		} else {
			this.setState({selectIds: [...this.state.selectIds, order.id]});
		}
		this.props.onSelect(this.state.selectIds);
	}
	render() {
		const {connection, selectMode, onSelect} = this.props;
		const selectIds = this.state.selectIds;

		return (
			<List className='scroll'>
				{
					connection.edges.map(({node}, index) => {
						const selectIndex = selectMode&&selectIds&&selectIds.findIndex(id => id === node.id);
						return (
							<Paper key={index} className='margin-bottom' style={styles.fix}>
								<OrderListItem order={node} selectMode={selectMode}
									select={selectIndex>=0} onClick={selectMode?this.onSelectOrder:this.onSelect}/>
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
						${OrderListItem.getFragment('order')}
					}
				}
			}
		`
	}
})