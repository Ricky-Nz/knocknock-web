import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconFolder from 'material-ui/svg-icons/file/folder';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const CategoryListItem = ({category, onAction}) => (
	<Paper className='margin-bottom'>
		<ListItem leftIcon={<IconFolder/>}
			primaryText={category.nameEn} secondaryText={category.nameCn}
			rightIconButton={
			  <IconMenu onChange={(event, value) => onAction(category, value)}
			  	iconButtonElement={<IconButton touch={true}><MoreVertIcon/></IconButton>}>
			    <MenuItem value='EDIT'>Edit</MenuItem>
			    <MenuItem value='DELETE'>Delete</MenuItem>
			  </IconMenu>
			}
			onTouchTap={() => onAction(category, 'VIEW')}/>
	</Paper>
);

CategoryListItem.propTypes = {
	onAction: PropTypes.func.isRequired
};

export default Relay.createContainer(CategoryListItem, {
	fragments: {
		category: () => Relay.QL`
			fragment on ClothCategory {
				id
				nameCn
				nameEn
				count
			}
		`
	}
});