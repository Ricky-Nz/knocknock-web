import Relay from 'react-relay';

export default class OrderBulkUpdateMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{bulkUpdateOrder}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on BluckUpdateOrderPayload @relay(pattern: true) {
        result
      }
    `;
  }
  getVariables() {
  	const { ids, status, pickupWorkerId } = this.props;

    return {
    	ids,
    	status,
    	pickupWorkerId
    };
  }
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on BluckUpdateOrderPayload {
            result
          }
        `,
      ],
    }];
  }
}
