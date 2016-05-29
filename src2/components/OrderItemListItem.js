import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconRemove from 'material-ui/svg-icons/content/remove';
import IconAdd from 'material-ui/svg-icons/content/add';

const OrderItemListItem = ({index, washType, itemImageUrl, itemNameCn, itemNameEn, quantity, onAction}) => (
	<Paper className='margin-top'>
		<div className='flex flex-row flex-align-center padding-horizontal'>
			<Avatar src={itemImageUrl}/>
			<div className='flex flex-fill'>
        <DropDownMenu value={washType} onChange={(arg, arg2, value) => onAction(index, 'WASH_TYPE', value)}>
          <MenuItem value='Wash&Iron' primaryText='Wash&Iron' />
          <MenuItem value='Dry Clean' primaryText='Dry Clean' />
          <MenuItem value='Iron' primaryText='Iron' />
        </DropDownMenu>
        <p style={styles.nameStyle}>{`${itemNameEn} (${itemNameCn})`}</p>
			</div>
			<div className='flex flex-row flex-align-center'>
				<IconButton onTouchTap={() => onAction(index, 'ADD')}><IconAdd/></IconButton>
				<p>{quantity}</p>
				<IconButton onTouchTap={() => onAction(index, 'REMOVE')}><IconRemove/></IconButton>
			</div>
		</div>
	</Paper>
);

const styles = {
	nameStyle: {
		padding: '0 16 0 24'
	}
};

OrderItemListItem.propTypes = {
	onAction: PropTypes.func.isRequired
};

export default OrderItemListItem;