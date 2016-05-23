import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';

// const ClothListItem = ({cloth, onAction}) => (
// 	<Paper className='margin-vertical'>
// 		<ListItem leftAvatar={<Avatar src={cloth.imageUrl}/>}
// 			primaryText={`${cloth.nameEn} (${cloth.nameCn})`}
// 			secondaryText={`Wash: $${cloth.washPrice}, Iron: $${cloth.ironPrice}, Dry: $${cloth.dryCleanPrice}`}
// 			rightIconButton={<IconButton onTouchTap={() => onAction(cloth, 'DELETE')}><IconDelete/></IconButton>}
// 			onTouchTap={() => onAction(cloth, 'EDIT')}/>
// 	</Paper>
// );

class ClothListItem extends Component {
	render() {
		const {cloth, onAction} = this.props;
		console.log(this.props);
		return (
			<Paper className='margin-vertical'>
				<ListItem leftAvatar={<Avatar src={cloth.imageUrl}/>}
					primaryText={`${cloth.nameEn} (${cloth.nameCn})`}
					secondaryText={`Wash: $${cloth.washPrice}, Iron: $${cloth.ironPrice}, Dry: $${cloth.dryCleanPrice}`}
					rightIconButton={<IconButton onTouchTap={() => onAction(cloth, 'DELETE')}><IconDelete/></IconButton>}
					onTouchTap={() => onAction(cloth, 'EDIT')}/>
			</Paper>
		);
	}
}
// const ClothListItem = ({cloth, onAction}) => (
// 	<Paper className='margin-vertical'>
// 		<ListItem leftAvatar={<Avatar src={cloth.imageUrl}/>}
// 			primaryText={`${cloth.nameEn} (${cloth.nameCn})`}
// 			secondaryText={`Wash: $${cloth.washPrice}, Iron: $${cloth.ironPrice}, Dry: $${cloth.dryCleanPrice}`}
// 			rightIconButton={<IconButton onTouchTap={() => onAction(cloth, 'DELETE')}><IconDelete/></IconButton>}
// 			onTouchTap={() => onAction(cloth, 'EDIT')}/>
// 	</Paper>
// );

ClothListItem.propTypes = {
	onAction: PropTypes.func.isRequired
};

export default Relay.createContainer(ClothListItem, {
	fragments: {
		cloth: () => Relay.QL`
			fragment on Cloth {
				id
				nameCn
				nameEn
				imageUrl
				washPrice
				ironPrice
				dryCleanPrice
				washPriceDiscount
			}
		`
	}
});