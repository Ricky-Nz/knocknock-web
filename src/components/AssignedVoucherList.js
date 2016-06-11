import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import AssignedVoucherListItem from './AssignedVoucherListItem';

const AssignedVoucherList = ({connection, onSelect}) => (
	<List className='scroll' style={styles.scrollBug}>
		{
			connection.edges.map(({node}, index) =>
				<AssignedVoucherListItem key={index} assigned={node} onClick={onSelect}/>)
		}
	</List>
);

AssignedVoucherList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

const styles = {
	scrollBug: {
		padding: 2
	}
};

export default Relay.createContainer(AssignedVoucherList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on AssignedVoucherConnection {
				edges {
					node {
						${AssignedVoucherListItem.getFragment('assigned')}
					}
				}
			}
		`
	}
})