import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const PromoTypeDropdownMenu = ({select, onSelect}) => (
	<SelectField floatingLabelText='Select Promo Type' value={select}
		onChange={(event, index, value) => onSelect(value)}>
		<MenuItem value={1} primaryText='Flat'/>
		<MenuItem value={0} primaryText='Percent'/>
  </SelectField>
);

PromoTypeDropdownMenu.propTypes = {
	select: PropTypes.string,
	onSelect: PropTypes.func.isRequired
};

export default PromoTypeDropdownMenu;