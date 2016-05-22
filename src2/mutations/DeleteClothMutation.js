import Relay from 'react-relay';

export default class DeleteClothMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ deleteCloth }`;
	}
	getVariables() {
		return {
			id: this.props.id
		};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on DeleteClothPayload @relay(pattern: true) {
				clothes
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
      	'clothes': this.props.viewer.id
      }
    }];
	}
}