import Relay from 'react-relay';

export default class AdminCreateMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createAdmin }`;
	}
	getVariables() {
		const { viewer, ...variables } = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateAdminPayload @relay(pattern: true) {
				adminEdge
				viewer {
					admins
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'admins',
      edgeName: 'adminEdge',
      rangeBehaviors: ({search}) => 'append'
    }];
	}
}