import Relay from 'react-relay';

export default class WorkerUpdateMutation extends Relay.Mutation {
	static fragments = {
		worker: () => Relay.QL`
			fragment on Worker {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ updateWorker }`;
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