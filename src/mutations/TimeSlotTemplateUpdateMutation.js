import Relay from 'react-relay';

export default class UpdateTimeSlotTemplateMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updateTimeSlotTemplate}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateTimeSlotTemplatePayload @relay(pattern: true) {
        timeSlotTemplate
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        timeSlotTemplate: this.props.id,
      },
    }];
  }
  getVariables() {
    return this.props;
  }
}
