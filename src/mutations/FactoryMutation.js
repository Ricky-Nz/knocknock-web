import Relay from 'react-relay';

export class CreateFactoryMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createFactory }`;
	}
	getVariables() {
		const { viewer, ...variables } = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateFactoryPayload @relay(pattern: true) {
				factoryEdge
				viewer {
					factories
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'factories',
      edgeName: 'factoryEdge',
      rangeBehaviors: ({search}) => 'prepend'
    }];
	}
}

export class UpdateFactoryMutation extends Relay.Mutation {
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

export class DeleteFactoryMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  }
	getMutation() {
		return Relay.QL`mutation{ deleteFactory }`;
	}
	getVariables() {
		const {viewer, ...variables} = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on DeleteFactoryPayload @relay(pattern: true) {
				deletedId
				viewer
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'factories',
      deletedIDFieldName: 'deletedId'
    }];
	}
}
