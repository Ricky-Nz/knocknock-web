import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import CategoryListItem from './CategoryListItem';
import { List } from 'material-ui/List';

class CategoryList extends Component {
	onItemClick = (category) => {

	}
	onDelete = (category) => {

	}
	render() {
		let clothCategories = this.props.viewer.clothCategories;
		const search = this.props.search;

		if (search) {
			clothCategories = clothCategories.filter(({nameCn, nameEn}) =>
				(nameCn&&(nameCn.indexOf(search) >= 0)
					|| nameEn&&(nameEn.indexOf(search) >= 0)));
		}

		return (
			<List>
				{
					clothCategories.map((category, index) =>
						<CategoryListItem key={index} category={category}
							onClick={this.onItemClick} onDelete={this.onItemDelete}/>)
				}
			</List>
		);
	}
}

CategoryList.propTypes = {
	search: PropTypes.string
};

export default Relay.createContainer(CategoryList, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				clothCategories {
					nameCn
					nameEn
					${CategoryListItem.getFragment('category')}
				}
			}
		`
	}
});