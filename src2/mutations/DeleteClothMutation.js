import Relay from 'react-relay';

export default class DeleteClothMutation extends Relay.Mutation {
	static fragments = {
		clothPage: () => Relay.QL`
			fragment on ClothPagination {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ deleteCloth }`;
	}
	getVariables() {
		return {
			id: this.props.id
		};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateClothPayload @relay(pattern: true) {
				deletedId
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'clothPage',
      parentID: this.props.clothPage.id,
      connectionName: 'datas',
      deletedIDFieldName: 'deletedId'
    }];
	}
}