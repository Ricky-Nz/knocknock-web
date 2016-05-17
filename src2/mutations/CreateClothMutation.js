import Relay from 'react-relay';

export default class CreateClothMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createLaundryCloth }`;
	}
	getVariables() {
		const { viewer, ...variables } = this.props;
		return variables;
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
  	console.log(this.props);
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'laundryClothes',
      edgeName: 'laundryClothEdge',
      rangeBehaviors: {
        '': 'append',
        'search()': 'append'
      },
    }];
	}
}