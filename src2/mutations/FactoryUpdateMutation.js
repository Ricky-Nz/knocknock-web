import Relay from 'react-relay';

export default class UpdateFactoryMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updateFactory}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateFactoryPayload @relay(pattern: true) {
        factory
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        factory: this.props.id,
      },
    }];
  }
  getVariables() {
    return this.props;
  }
}
