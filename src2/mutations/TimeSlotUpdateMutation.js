import Relay from 'react-relay';

export default class UpdateTimeSlotMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updateTimeSlot}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateTimeSlotPayload @relay(pattern: true) {
        timeSlot
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        timeSlot: this.props.id,
      },
    }];
  }
  getVariables() {
    return this.props;
  }
}
