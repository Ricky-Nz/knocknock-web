import Relay from 'react-relay';

export default class DeleteAddressMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  }
	getMutation() {
		return Relay.QL`mutation{ deleteAddress }`;
	}
	getVariables() {
		const {user, ...variables} = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on DeleteAddressPayload @relay(pattern: true) {
				deletedId
				user
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'addresses',
      deletedIDFieldName: 'deletedId'
    }];
	}
}