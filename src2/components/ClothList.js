import React, { Component } from 'react';
import Relay from 'react-relay';
import ClothListItem from './ClothListItem';

class ClothList extends Component {
	render() {
		return (
			<div>
			</div>
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