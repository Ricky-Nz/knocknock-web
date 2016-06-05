import Relay from 'react-relay';

export default class UpdateTimeSlotMutation extends Relay.Mutation {
  static fragments = {
    slot: () => Relay.QL`
      fragment on TimeSlot {
        id
      }
    `
  }
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
        timeSlot: this.props.slot.id,
      },
    }];
  }
  getVariables() {
    const {slot, ...variables} = this.props;
    return {
      id: slot.id,
      ...variables
    };
  }
}
