import Relay from 'react-relay';

export class CreateUserMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{createUser}`;
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
			fragment on CreateUserPayload @relay(pattern: true) {
				userEdge
				viewer {
					users
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'users',
      edgeName: 'userEdge',
      rangeBehaviors: ({search}) => 'prepend'
    }];
	}
}

export class UpdateUserMutation extends Relay.Mutation {
	static fragments = {
		user: () => Relay.QL`
			fragment on User {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{updateUser}`;
	}
  getFiles() {
  	if (this.props.file) {
	    return {
	      file: this.props.file,
	    };
  	}
  }
	getVariables() {
		const { user, file, ...variables } = this.props;
		return {id: user.id, ...variables};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on UpdateUserPayload {
				user
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
      	user: this.props.user.id
      }
    }];
	}
}
