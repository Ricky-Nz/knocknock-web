import React from 'react';
import Relay from 'react-relay';

const LaundryClothListItemComponent = ({laundryCloth}) => (
	<div>
	</div>
);

export default Relay.createContainer(LaundryClothListItemComponent, {
	fragments: {
		laundryCloth: () => Relay.QL`
			fragment on LaundryCloth {
				id
				nameCn
				nameEn
			}
		`
	}
});