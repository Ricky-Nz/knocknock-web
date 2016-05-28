import Relay from 'react-relay';

export default class CreateTimeSlotMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createTimeSlot }`;
	}
	getVariables() {
		const { viewer, ...variables } = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateTimeSlotPayload @relay(pattern: true) {
				timeSlotEdge
				viewer {
					timeSlots
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'timeSlots',
      edgeName: 'timeSlotEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
	}
}