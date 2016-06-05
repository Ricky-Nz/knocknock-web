import React, { Component } from 'react';
import Relay from 'react-relay';

class AnalyticsPage extends Component {
	render() {
		return (
			<div className='flex flex-fill'>
			</div>
		);
	}
}

export default Relay.createContainer(AnalyticsPage, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
});