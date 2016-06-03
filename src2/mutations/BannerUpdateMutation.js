import Relay from 'react-relay';

export default class UpdateBannerMutation extends Relay.Mutation {
	getMutation() {
		return Relay.QL`mutation{ updateBanner }`;
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
			fragment on UpdateBannerPayload @relay(pattern: true) {
				banner
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
      	'banner': this.props.id
      }
    }];
	}
}