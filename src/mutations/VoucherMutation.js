import Relay from 'react-relay';

export class CreateVoucherMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{createVoucher}`;
	}
	getVariables() {
		const { viewer, ...variables } = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateVoucherPayload @relay(pattern: true) {
				voucherEdge
				viewer {
					vouchers
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'vouchers',
      edgeName: 'voucherEdge',
      rangeBehaviors: ({search}) => 'append'
    }];
	}
}

export class UpdateVoucherMutation extends Relay.Mutation {
	static fragments = {
		voucher: () => Relay.QL`
			fragment on Voucher {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{updateVoucher}`;
	}
	getVariables() {
		const { voucher, ...variables } = this.props;
		return {id: voucher.id, ...variables};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on UpdateVoucherPayload {
				voucher
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
      	voucher: this.props.voucher.id
      }
    }];
	}
}

export class DeleteVoucherMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
    voucher: () => Relay.QL`
    	fragment on Voucher {
    		id
    	}
    `
  }
	getMutation() {
		return Relay.QL`mutation{deleteVoucher}`;
	}
	getVariables() {
		const {viewer, voucher} = this.props;
		return {
			id: voucher.id
		};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on DeleteVoucherPayload @relay(pattern: true) {
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
      connectionName: 'vouchers',
      deletedIDFieldName: 'deletedId'
    }];
	}
}
