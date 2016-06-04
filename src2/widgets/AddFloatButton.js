import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddFloatButton = ({className, onClick}) => (
	<FloatingActionButton className={className} onClick={onClick}>
	  <ContentAdd/>
	</FloatingActionButton>
);

export default AddFloatButton;