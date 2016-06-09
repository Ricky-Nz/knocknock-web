import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import BannerListItem from './BannerListItem';

const BannerList = ({connection, onSelect}) => (
	<List className='scroll' style={styles.scrollBug}>
		{
			connection.edges.map(({node}, index) =>
				<Paper key={index} className='margin-bottom'>
					<BannerListItem banner={node} onClick={onSelect}/>
				</Paper>
			)
		}
	</List>
);

BannerList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

const styles = {
	scrollBug: {
		padding: '0 2'
	}
};

export default Relay.createContainer(BannerList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on BannerConnection {
				edges {
					node {
						${BannerListItem.getFragment('banner')}
					}
				}
			}
		`
	}
});