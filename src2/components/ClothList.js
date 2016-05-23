import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import ClothListItem from './ClothListItem';
import { List } from 'material-ui/List';

class ClothList extends Component {
	render() {
		let edges = this.props.connection.edges;
		const { search, categoryId, onAction } = this.props;

		if (categoryId) {
			edges = edges.filter(({node}) => node.categoryId === categoryId);
		}

		if (search) {
			edges = edges.filter(({node}) =>
				(node.nameCn&&(node.nameCn.indexOf(search) >= 0)
					|| node.nameEn&&(node.nameEn.indexOf(search) >= 0)));
		}

		return (
			<List>
				{
					edges.map(({node}, index) =>
						<ClothListItem key={index} cloth={node} onAction={onAction}/>)
				}
			</List>
		);
	}
}

ClothList.propTypes = {
	search: PropTypes.string,
	categoryId: PropTypes.string,
	onAction: PropTypes.func.isRequired
};

export default Relay.createContainer(ClothList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on ClothConnection {
				edges {
					node {
						nameCn
						nameEn
						categoryId
						${ClothListItem.getFragment('cloth')}
					}
				}
			}
		`
	}
});