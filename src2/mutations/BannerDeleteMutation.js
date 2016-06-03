import Relay from 'react-relay';

export default class DeleteBannerMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ deleteBanner }`;
	}
	getVariables() {
		return {
			id: this.props.id
		};
	}
	getFatQuery() {
		return Relay.QL`
			fragment on DeleteBannerPayload @relay(pattern: true) {
        deletedId,
        viewer {
          banners
        }
			}
		`;
	}
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'banners',
      deletedIDFieldName: 'deletedId',
    }];
	}
}