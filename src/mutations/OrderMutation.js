import Relay from 'react-relay';

export class CreateOrderMutation extends Relay.Mutation {
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
      rangeBehaviors: ({search}) => 'append'
    }];
	}
}

export class UpdateOrderMutation extends Relay.Mutation {
  static fragments = {
    order: () => Relay.QL`
      fragment on Order {
        id
      }
    `
  }
  getMutation() {
    return Relay.QL`mutation{updateOrder}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateOrderPayload @relay(pattern: true) {
        order
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        order: this.props.order.id,
      },
    }];
  }
  getVariables() {
    const { order, ...variables } = this.props;
    return {
      id: order.id,
      ...variables
    };
  }
}