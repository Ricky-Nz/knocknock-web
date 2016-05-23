import Relay from 'react-relay';

export default class CreateCategoryMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createCategory }`;
	}
	getVariables() {
		const { viewer, ...variables } = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateCategoryPayload @relay(pattern: true) {
				categoryEdge
				viewer{
					categories
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'categories',
      edgeName: 'categoryEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
	}
}