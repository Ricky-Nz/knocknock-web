import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';
import { red500 } from 'material-ui/styles/colors';

const ClothListItem = ({cloth, onClick}) => {
	const discountWashPrice = cloth.enableWashPriceDiscount&&cloth.discountWashPrice;
	const discountIronPrice = cloth.enableIronPriceDiscount&&cloth.discountIronPrice;
	const discountDryCleanPrice = cloth.enableDryCleanPriceDiscount&&cloth.discountDryCleanPrice;

	return (
		<ListItem leftAvatar={<Avatar src={cloth.imageUrl}/>}
			primaryText={`${cloth.nameEn} (${cloth.nameCn})`}
			secondaryTextLines={2}
			secondaryText={
				<div>
					<div className='flex flex-row'>
						<div className='flex flex-fill'>Wash&Iron</div>
						<div className='flex flex-fill'>Dry Clean</div>
						<div className='flex flex-fill'>Iron</div>
					</div>
					<div className='flex flex-row'>
						<div className='flex flex-fill' style={discountWashPrice?styles.discount:null}>
							{discountWashPrice?discountWashPrice:(cloth.washPrice||'n/a')}
						</div>
						<div className='flex flex-fill' style={discountDryCleanPrice?styles.discount:null}>
							{discountDryCleanPrice?discountDryCleanPrice:(cloth.washPrice||'n/a')}
						</div>
						<div className='flex flex-fill' style={discountIronPrice?styles.discount:null}>
							{discountIronPrice?discountIronPrice:(cloth.washPrice||'n/a')}
						</div>
					</div>
				</div>
			}
			rightToggle={<Toggle toggled={cloth.enabled}/>} onClick={() => onClick(cloth)}/>	
	);
}

ClothListItem.propTypes = {
	onClick: PropTypes.func.isRequired
};

const styles = {
	discount: {
		color: red500
	}
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
				dryCleanPrice
				ironPrice
				discountWashPrice
				discountDryCleanPrice
				discountIronPrice
				enableWashPriceDiscount
				enableDryCleanPriceDiscount
				enableIronPriceDiscount
				enabled
			}
		`
	}
});