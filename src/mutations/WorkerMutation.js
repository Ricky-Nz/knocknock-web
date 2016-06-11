import Relay from 'react-relay';

export class CreateWorkerMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{createWorker}`;
	}
  getFiles() {
  	if (this.props.file) {
	    return {
	      file: this.props.file,
	    };
  	}
  }
	getVariables() {
		const { viewer, file, ...variables } = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateWorkerPayload @relay(pattern: true) {
				workerEdge
				viewer {
					workers
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'workers',
      edgeName: 'workerEdge',
      rangeBehaviors: ({search}) => 'prepend'
    }];
	}
}

export class UpdateWorkerMutation extends Relay.Mutation {
	static fragments = {
		worker: () => Relay.QL`
			fragment on Worker {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{updateWorker}`;
	}
  getFiles() {
  	if (this.props.file) {
	    return {
	      file: this.props.file,
	    };
  	}
  }
	getVariables() {
		const { worker, file, ...variables } = this.props;
		return {id: worker.id, ...variables};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on UpdateWorkerPayload {
				worker
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
      	worker: this.props.worker.id
      }
    }];
	}
}

export class DeleteWorkerMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
    worker: () => Relay.QL`
    	fragment on Worker {
    		id
    	}
    `
  }
	getMutation() {
		return Relay.QL`mutation{ deleteWorker }`;
	}
	getVariables() {
		const {viewer, worker, ...variables} = this.props;
		return {
			id: worker.id,
			...variables
		};
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

