import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import OrderListItem from './OrderListItem';

class OrderList extends Component {
	render() {
		const {connection, selectMode, selects, onAction} = this.props;

		return (
			<List className='scroll'>
				{
					connection.edges.map(({node}, index) => {
						const selectIndex = selectMode&&selects&&selects.findIndex(select => select.id === node.id);
						return (
							<Paper key={index} className='margin-bottom' style={styles.fix}>
								<OrderListItem order={node} selectMode={selectMode}
									select={selectIndex>=0} onAction={onAction}/>
							</Paper>
						)
					})
				}
			</List>
		);
	}
}

OrderList.propTypes = {
	selectMode: PropTypes.bool,
	selects: PropTypes.arrayOf(PropTypes.object)
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