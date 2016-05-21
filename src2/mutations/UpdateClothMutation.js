import Relay from 'react-relay';

export default class UpdateClothMutation extends Relay.Mutation {
	static fragments = {
		cloth: () => Relay.QL`
			fragment on Cloth {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ updateCloth }`;
	}
  getFiles() {
  	if (this.props.file) {
	    return {
	      file: this.props.file,
	    };
  	}
  }
	getVariables() {
		const {cloth, file, ...args} = this.props;
		return {
			...args,
			id: cloth.id
		};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on UpdateClothPayload {
				cloth
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
      	'cloth': this.props.id
      }
    }];
	}
}