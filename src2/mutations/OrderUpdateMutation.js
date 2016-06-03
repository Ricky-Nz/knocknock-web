import Relay from 'react-relay';

export default class UpdateOrderMutation extends Relay.Mutation {
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
