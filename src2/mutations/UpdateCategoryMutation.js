import Relay from 'react-relay';

export default class UpdateCategoryMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updateCategory}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateCategoryPayload @relay(pattern: true) {
        category {
          nameCn
          nameEn
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        category: this.props.id,
      },
    }];
  }
  getVariables() {
    return this.props;
  }
}
