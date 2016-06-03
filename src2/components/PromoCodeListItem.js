import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';

const PromoCodeListItem = ({promoCode}) => (
  <TableRow selectable={false}>
    <TableRowColumn>{promoCode.code}</TableRowColumn>
    <TableRowColumn>{promoCode.name}</TableRowColumn>
    <TableRowColumn>{promoCode.start}</TableRowColumn>
    <TableRowColumn>{promoCode.end}</TableRowColumn>
    <TableRowColumn>{promoCode.promoType}</TableRowColumn>
    <TableRowColumn>{promoCode.promoValue}</TableRowColumn>
    <TableRowColumn>{promoCode.amount}</TableRowColumn>
  </TableRow>
);

PromoCodeListItem.propTypes = {
	
};

export default Relay.createContainer(PromoCodeListItem, {
	fragments: {
		promoCode: () => Relay.QL`
			fragment on PromoCode {
				id
				enabled
				code
				name
				start
				end
				perUserLimit
				limit
				promoType
				promoValue
				amount
				multipleUse
				mobileOnly
				firstTimeUser
			}
		`
	}
});