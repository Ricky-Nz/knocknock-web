import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import VoucherListItem from './VoucherListItem';

const VoucherList = ({connection, onSelect}) => (
	<List className='scroll' style={styles.scrollBug}>
		{
			connection.edges.map(({node}, index) =>
				<VoucherListItem key={index} voucher={node} onClick={onSelect}/>)
		}
	</List>
);

VoucherList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

const styles = {
	scrollBug: {
		padding: 2
	}
};

export default Relay.createContainer(VoucherList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on VoucherConnection {
				edges {
					node {
						${VoucherListItem.getFragment('voucher')}
					}
				}
			}
		`
	}
})