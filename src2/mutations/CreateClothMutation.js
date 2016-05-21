import Relay from 'react-relay';

export default class CreateClothMutation extends Relay.Mutation {
	static fragments = {
		clothPage: () => Relay.QL`
			fragment on ClothPagination {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createCloth }`;
	}
  getFiles() {
    return {
      file: this.props.file,
    };
  }
	getVariables() {
		const { clothPage, file, ...variables } = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateClothPayload {
				clothPage {
					id
					pagination{
						totalPage
						limit
						page
					}
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