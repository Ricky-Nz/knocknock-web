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
		return Relay.QL`mutation{ createCloth }`;
	}
  getFiles() {
    return {
      file: this.props.file,
    };
  }
	getVariables() {
		const { viewer, file, ...variables } = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateClothPayload @relay(pattern: true) {
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