import Relay from 'react-relay';

export default class AdminUpdateMutation extends Relay.Mutation {
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
  getFiles() {
  	if (this.props.file) {
	    return {
	      file: this.props.file,
	    };
  	}
  }
	getVariables() {
		const { admin, file, ...variables } = this.props;
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