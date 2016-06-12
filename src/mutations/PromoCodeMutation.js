import Relay from 'react-relay';

export class CreatePromoCodeMutation extends Relay.Mutation {
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
      rangeBehaviors: ({search}) => 'append'
    }];
	}
}

export class UpdatePromoCodeMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updatePromoCode}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdatePromoCodePayload @relay(pattern: true) {
        promoCode
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        promoCode: this.props.id,
      },
    }];
  }
  getVariables() {
    return this.props;
  }
}

export class DeletePromoCodeMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  }
	getMutation() {
		return Relay.QL`mutation{ deletePromoCode }`;
	}
	getVariables() {
		const {viewer, ...variables} = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on DeletePromoCodePayload @relay(pattern: true) {
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
      connectionName: 'promoCodes',
      deletedIDFieldName: 'deletedId'
    }];
	}
}