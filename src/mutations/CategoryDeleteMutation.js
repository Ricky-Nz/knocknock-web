import Relay from 'react-relay';

export default class DeleteCategoryMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `
  }
  getMutation() {
    return Relay.QL`mutation{deleteCategory}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteCategoryPayload @relay(pattern: true) {
        deletedId,
        viewer {
          categories
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'categories',
      deletedIDFieldName: 'deletedId',
    }];
  }
  getVariables() {
    return {
      id: this.props.id,
    };
  }
}
