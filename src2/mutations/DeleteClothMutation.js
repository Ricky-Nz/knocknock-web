import Relay from 'react-relay';

export default class DeleteClothMutation extends Relay.Mutation {
	static fragments = {
		clothPage: () => Relay.QL`
			fragment on ClothPagination {
				id
			}
		`,
		cloth: () => Relay.QL`
			fragment on Cloth {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ deleteCloth }`;
	}
	getVariables() {
		return {
			id: this.props.cloth.id
		};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on DeleteClothPayload @relay(pattern: true) {
				clothPage{
					datas
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
      	'clothPage': this.props.clothPage.id
      }
    }];
	}
}