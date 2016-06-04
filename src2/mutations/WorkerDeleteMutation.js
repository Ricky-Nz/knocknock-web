import Relay from 'react-relay';

export default class WorkerDeleteMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  }
	getMutation() {
		return Relay.QL`mutation{ deleteWorker }`;
	}
	getVariables() {
		const {viewer, ...variables} = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on DeleteWorkerPayload @relay(pattern: true) {
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
      connectionName: 'workers',
      deletedIDFieldName: 'deletedId'
    }];
	}
}