import Relay from 'react-relay';

export default class UpdatePromoCodeMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updatePromoCode}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdatePromoCodePayload @relay(pattern: true) {
        promoCode
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        promoCode: this.props.id,
      },
    }];
  }
  getVariables() {
    return this.props;
  }
}
