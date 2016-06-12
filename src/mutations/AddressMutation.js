import Relay from 'react-relay';

export class CreateAddressMutation extends Relay.Mutation {
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

export class UpdateAddressMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updateAddress}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateAddressPayload @relay(pattern: true) {
        address
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        address: this.props.id,
      },
    }];
  }
  getVariables() {
    return this.props;
  }
}

export class DeleteAddressMutation extends Relay.Mutation {
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
