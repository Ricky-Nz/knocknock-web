import Relay from 'react-relay';

export default class CreateBannerMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createBanner }`;
	}
  getFiles() {
    return {
      file: this.props.file,
    };
  }
	getVariables() {
		const { viewer, file, ...variables } = this.props;
		return variables;
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateBannerPayload @relay(pattern: true) {
				bannerEdge
				viewer {
					banners
				}
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'banners',
      edgeName: 'bannerEdge',
      rangeBehaviors: ({search}) => 'append'
    }];
	}
}