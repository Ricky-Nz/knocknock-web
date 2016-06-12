import Relay from 'react-relay';

export class CreateCategoryMutation extends Relay.Mutation {
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
      rangeBehaviors: ({search}) => 'append'
    }];
	}
}

export class UpdateCategoryMutation extends Relay.Mutation {
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

export class DeleteCategoryMutation extends Relay.Mutation {
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