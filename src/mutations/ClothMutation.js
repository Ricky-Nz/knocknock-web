import Relay from 'react-relay';

export class CreateClothMutation extends Relay.Mutation {
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
      rangeBehaviors: ({search}) => 'append'
    }];
	}
}

export class UpdateClothMutation extends Relay.Mutation {
	getMutation() {
		return Relay.QL`mutation{ updateCloth }`;
	}
  getFiles() {
  	if (this.props.file) {
	    return {
	      file: this.props.file,
	    };
  	}
  }
	getVariables() {
		const {file, ...args} = this.props;
		return args;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on UpdateClothPayload @relay(pattern: true) {
				cloth
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
      	'cloth': this.props.id
      }
    }];
	}
}

export class DeleteClothMutation extends Relay.Mutation {
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
        deletedId,
        viewer {
          clothes
        }
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'clothes',
      deletedIDFieldName: 'deletedId',
    }];
	}
}