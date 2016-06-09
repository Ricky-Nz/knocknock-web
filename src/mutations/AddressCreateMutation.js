import Relay from 'react-relay';

export default class CreateAddressMutation extends Relay.Mutation {
	static fragments = {
		user: () => Relay.QL`
			fragment on User {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createAddress }`;
	}
	getVariables() {
		const { user, ...variables } = this.props;
		return {
			userId: user.id,
			...variables
		};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateAddressPayload @relay(pattern: true) {
				addressEdge
				user {
					addresses
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'addresses',
      edgeName: 'addressEdge',
      rangeBehaviors: () => 'append'
    }];
	}
}