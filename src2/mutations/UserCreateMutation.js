import Relay from 'react-relay';

export default class CreateUserMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createUser }`;
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
				clothEdge
				viewer {
					clothes
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'clothes',
      edgeName: 'clothEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
	}
}