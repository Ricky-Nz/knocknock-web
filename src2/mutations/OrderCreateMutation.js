import Relay from 'react-relay';

export default class OrderCreateMutation extends Relay.Mutation {
	static fragments = {
		user: () => Relay.QL`
			fragment on User {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createOrder }`;
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
			fragment on CreateOrderPayload @relay(pattern: true) {
				orderEdge {
					node {
						id
					}
				}
				user {
					orders
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'orders',
      edgeName: 'orderEdge',
      rangeBehaviors: {
        '': 'prepend'
      }
    }];
	}
}