import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';
import { ListItem } from 'material-ui/List';

const BannerListItem = ({banner, onClick}) => (
	<div className='flex flex-row' style={styles.container}>
		<div className='flex flex-fill' onClick={() => onClick(banner)}
			style={{...styles.image, backgroundImage: `url(${banner.imageUrl})`}}/>
		<div className='flex padding' style={styles.details}>
			<p>{`Title: ${banner.title}`}</p>
			<p>Link: <a href={banner.link} target='_blank'>{banner.link}</a></p>
			<div className='flex flex-fill flex-end flex-align-end'>
				<Toggle label='Enabled' toggled={banner.enabled}/>
			</div>
		</div>
	</div>
);

BannerListItem.propTypes = {
	onClick: PropTypes.func.isRequired
};

const styles = {
	container: {
		height: 180
	},
	image: {
		height: '100%',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	details: {
		width: 300
	},
	toggle: {
	}
};

export default Relay.createContainer(BannerListItem, {
	fragments: {
		banner: () => Relay.QL`
			fragment on Banner {
				id
				enabled
				title
				link
				position
				imageUrl
			}
		`
	}
});