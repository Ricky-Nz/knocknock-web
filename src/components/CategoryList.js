import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import CategoryListItem from './CategoryListItem';
import { List } from 'material-ui/List';

const CategoryList = ({connection, onAction}) => (
	<List>
		{
			connection.edges.map(({node}, index) =>
				<Paper key={index} className='margin-bottom'>
					<CategoryListItem category={node}
						onAction={onAction}/>
				</Paper>
			)
		}
	</List>
);

CategoryList.propTypes = {
	onAction: PropTypes.func.isRequired
};

export default Relay.createContainer(CategoryList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on ClothCategoryConnection {
				edges {
					node {
						${CategoryListItem.getFragment('category')}
					}
				}
			}
		`
	}
});