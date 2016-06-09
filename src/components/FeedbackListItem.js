import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const FeedbackListItem = ({feedback}) => (
	<ListItem leftAvatar={<Avatar src={feedback.user&&feedback.user.avatarUrl}/>}
		primaryText={`${(feedback.user&&feedback.user.firstName)||''} ${(feedback.user&&feedback.user.lastName)||''}: ${feedback.rating}`}
		secondaryText={feedback.comment}
		secondaryTextLines={2}
		rightIcon={<div style={styles.time}>{feedback.createdAt}</div>}/>	
);

const styles = {
	time: {
		width: 110
	}
};

export default Relay.createContainer(FeedbackListItem, {
	fragments: {
		feedback: () => Relay.QL`
			fragment on Feedback {
				rating
				comment
				createdAt
				user {
					avatarUrl
					firstName
					lastName
				}
			}
		`
	}
});