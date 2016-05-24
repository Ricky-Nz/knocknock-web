import Relay from 'react-relay';

export default class UserCreateMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
	getMutation() {
		return Relay.QL`mutation{ createUser }`;
	}
  getFiles() {
  	if (this.props.file) {
	    return {
	      file: this.props.file,
	    };
  	}
  }
	getVariables() {
		const { viewer, file, ...variables } = this.props;
		return variables;
	}
	getFatQuery() {
		console.log('getFatQuery');
		console.log(this.props);
		return Relay.QL`
			fragment on CreateUserPayload @relay(pattern: true) {
				userEdge
				viewer {
					users(role:"client")
				}
			}
		`;
	}
  getConfigs() {
  	console.log('getConfigs');
		console.log(this.props);
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'users',
      edgeName: 'userEdge',
      rangeBehaviors: {
        '': 'prepend',
        'role(client)': 'prepend'
      }
    }];
	}
}