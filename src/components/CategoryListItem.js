import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconFolder from 'material-ui/svg-icons/file/folder';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';

const CategoryListItem = ({category, onAction}) => (
	<ListItem leftIcon={<IconFolder/>}
		primaryText={category.nameEn} secondaryText={category.nameCn}
		rightIconButton={<IconButton onTouchTap={() => onAction(category, 'EDIT')}><IconEditor/></IconButton>}
		onTouchTap={() => onAction(category, 'VIEW')}/>
);

CategoryListItem.propTypes = {
	onAction: PropTypes.func.isRequired
};

export default Relay.createContainer(CategoryListItem, {
	fragments: {
		category: () => Relay.QL`
			fragment on Category {
				id
				nameCn
				nameEn
			}
		`
	}
});