import Relay from 'react-relay';

export default class UpdateClothMutation extends Relay.Mutation {
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
		const {file, ...args} = this.props;
		return args;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on UpdateClothPayload @relay(pattern: true) {
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