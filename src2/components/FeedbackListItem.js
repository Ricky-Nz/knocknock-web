import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

const FeedbackListItem = ({feedback, onClick}) => (
	<Paper className='margin-bottom'>
		<ListItem leftAvatar={<Avatar src={feedback.user.avatarUrl}/>}
			primaryText={`${feedback.user.name}: ${feedback.rating}`}
			secondaryText={feedback.comment} onClick={() => onClick(feedback)}/>
	</Paper>
);

export default Relay.createContainer(FeedbackListItem, {
	fragments: {
		feedback: () => Relay.QL`
			fragment on Feedback {
				userId
				rating
				comment
				source
				user {
					avatarUrl
					name
				}
			}
		`
	}
});