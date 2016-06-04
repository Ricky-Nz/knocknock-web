import React, { Component } from 'react';
import Relay from 'react-relay';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

class AnalyticsPage extends Component {
	render() {
		return (
			<div className='flex flex-fill'>
			</div>
		);
	}
}

const component = Relay.createContainer(AnalyticsPage, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`
	}
});

export default {
	queries,
	component
};