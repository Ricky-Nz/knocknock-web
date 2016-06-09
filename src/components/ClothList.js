import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import ClothListItem from './ClothListItem';
import { List } from 'material-ui/List';

const ClothList = ({connection, onSelect}) => (
	<List className='scroll' style={styles.scrollBug}>
		{
			connection.edges.map(({node}, index) =>
				<Paper key={index} className='margin-bottom'>
					<ClothListItem cloth={node} onClick={onSelect}/>
				</Paper>
			)
		}
	</List>
);

ClothList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

const styles = {
	scrollBug: {
		padding: '0 2'
	}
};

export default Relay.createContainer(ClothList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on ClothConnection {
				edges {
					node {
						${ClothListItem.getFragment('cloth')}
					}
				}
			}
		`
	}
});