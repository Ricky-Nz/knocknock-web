import Relay from 'react-relay';

export default class DeleteAdminMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  }
	getMutation() {
		return Relay.QL`mutation{deleteAdmin}`;
	}
	getVariables() {
		const {viewer, ...variables} = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on DeleteAdminPayload @relay(pattern: true) {
				deletedId
				viewer
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'admins',
      deletedIDFieldName: 'deletedId'
    }];
	}
}