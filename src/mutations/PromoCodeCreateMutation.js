import Relay from 'react-relay';

export default class CreatePromoCodeMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createPromoCode }`;
	}
	getVariables() {
		const { viewer, ...variables } = this.props;
		return {
			...variables
		};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreatePromoCodePayload @relay(pattern: true) {
				promoCodeEdge
				viewer {
					promoCodes
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'promoCodes',
      edgeName: 'promoCodeEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
	}
}