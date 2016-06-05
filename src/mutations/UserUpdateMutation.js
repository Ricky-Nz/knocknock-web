import Relay from 'react-relay';

export default class UserUpdateMutation extends Relay.Mutation {
	static fragments = {
		user: () => Relay.QL`
			fragment on User {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ updateUser }`;
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