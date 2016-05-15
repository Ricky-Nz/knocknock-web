import Relay from 'react-relay';

export default class CreateClothMutation extends Relay.Mutation {
	getMutation() {
		return Relay.QL`mutation{createLaundryCloth}`;
	}
	getVariables() {
		console.log(11);
		console.log(this.props);
		return {
			nameCn: ''
		};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateLaundryClothPayload @relay(pattern: true) {
				laundryClothEdge
				viewer {
					laundryClothes
				}
			}
		`;
	}
	getConfigs() {
		return [{
			type: 'RANGE_ADD',
			parentName: 'viewer',
			connectionName: 'laundryClothes',
			edgeName: 'laundryClothEdge',
			rangeBehaviors: {
				'': 'append'
			}
		}];
	}
}