import Relay from 'react-relay';

export default class CreateFactoryMutation extends Relay.Mutation {
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
      rangeBehaviors: ({search}) => 'append'
    }];
	}
}