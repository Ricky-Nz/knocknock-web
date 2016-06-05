import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = (props) => (
	<div className='flex flex-fill flex-center flex-align-center'>
		<CircularProgress size={0.5}/>
	</div>
);

export default Loading;