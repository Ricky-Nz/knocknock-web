import Relay from 'react-relay';

export class CreateBannerMutation extends Relay.Mutation {
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

export class UpdateBannerMutation extends Relay.Mutation {
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

export class DeleteBannerMutation extends Relay.Mutation {
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