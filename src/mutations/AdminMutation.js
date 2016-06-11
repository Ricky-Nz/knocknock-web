import Relay from 'react-relay';

export class CreateAdminMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{createAdmin}`;
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
      rangeBehaviors: ({search}) => 'prepend'
    }];
	}
}

export class UpdateAdminMutation extends Relay.Mutation {
	static fragments = {
		admin: () => Relay.QL`
			fragment on Admin {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ updateAdmin }`;
	}
	getVariables() {
		const { admin, ...variables } = this.props;
		return {id: admin.id, ...variables};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on UpdateAdminPayload {
				admin
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
      	admin: this.props.admin.id
      }
    }];
	}
}

export class DeleteAdminMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
    admin: () => Relay.QL`
    	fragment on Admin {
    		id
    	}
    `
  }
	getMutation() {
		return Relay.QL`mutation{deleteAdmin}`;
	}
	getVariables() {
		const {viewer, admin, ...variables} = this.props;
		return {
			id: admin.id,
			...variables
		};
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