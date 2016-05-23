import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import CategoryListItem from './CategoryListItem';
import { List } from 'material-ui/List';

class CategoryList extends Component {
	render() {
		let edges = this.props.connection.edges;
		const search = this.props.search;

		if (search) {
			edges = edges.filter(({node}) =>
				(node.nameCn&&(node.nameCn.indexOf(search) >= 0)
					|| node.nameEn&&(node.nameEn.indexOf(search) >= 0)));
		}

		return (
			<List>
				{
					edges.map(({node}, index) =>
						<CategoryListItem key={index} category={node}
							onAction={this.props.onAction}/>)
				}
			</List>
		);
	}
}

CategoryList.propTypes = {
	search: PropTypes.string,
	onAction: PropTypes.func.isRequired
};

export default Relay.createContainer(CategoryList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on ClothCategoryConnection {
				edges {
					node {
						nameCn
						nameEn
						${CategoryListItem.getFragment('category')}
					}
				}
			}
		`
	}
});