import React, { Component } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import ClothListItem from './ClothListItem';

class ClothList extends Component {
	render() {
		return (
			<List>
				{
					this.props.laundryClothes.edges.map(({node}, index) =>
						<ClothListItem key={index} laundryCloth={node}/>)
				}
			</List>
		);
	}
}

export default Relay.createContainer(ClothList, {
	fragments: {
		laundryClothes: () => Relay.QL`
			fragment on LaundryClothConnection {
				edges {
					node {
						${ClothListItem.getFragment('laundryCloth')}
					}
				}
			}
		`
	}
});