import Relay from 'react-relay';

export default class CreateTimeSlotTemplateMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createTimeSlotTemplate }`;
	}
	getVariables() {
		const { viewer, ...variables } = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateTimeSlotTemplatePayload @relay(pattern: true) {
				timeSlotTemplateEdge
				viewer {
					timeSlotTemplates
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'timeSlotTemplates',
      edgeName: 'timeSlotTemplateEdge',
      rangeBehaviors: {
        '': 'refetch'
      }
    }];
	}
}