import Relay from 'react-relay';

export default class UpdateAddressMutation extends Relay.Mutation {
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
