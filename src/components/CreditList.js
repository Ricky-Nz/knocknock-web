import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import CreditListItem from './CreditListItem';

const CreditList = ({connection, onSelect}) => (
	<List className='scroll' style={styles.scrollBug}>
		{
			connection.edges.map(({node}, index) =>
				<Paper key={index} className='margin-bottom'>
					<CreditListItem credit={node} onClick={onSelect}/>
				</Paper>
			)
		}
	</List>
);

CreditList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

const styles = {
	scrollBug: {
		padding: 2
	}
};

export default Relay.createContainer(CreditList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on CreditRecordConnection {
				edges {
					node {
						${CreditListItem.getFragment('credit')}
					}
				}
			}
		`
	}
})