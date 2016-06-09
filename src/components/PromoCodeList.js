import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const PromoCodeList = ({connection, onSelect}) => (
  <Table fixedHeader={true} onCellClick={index => onSelect(connection.edges[index].node)}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
      	<TableHeaderColumn>Enabled</TableHeaderColumn>
        <TableHeaderColumn>Code</TableHeaderColumn>
        <TableHeaderColumn>Start</TableHeaderColumn>
        <TableHeaderColumn>End</TableHeaderColumn>
        <TableHeaderColumn>Type</TableHeaderColumn>
        <TableHeaderColumn>Flat Discount</TableHeaderColumn>
        <TableHeaderColumn>Percent Discount</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody showRowHover={true} stripedRows={true}
    	displayRowCheckbox={false}>
			{
				connection.edges.map(({node}, index) =>
					<TableRow key={index}>
						<TableRowColumn><Toggle toggled={node.enabled}/></TableRowColumn>
						<TableRowColumn>{node.name}</TableRowColumn>
						<TableRowColumn>{node.start}</TableRowColumn>
						<TableRowColumn>{node.end}</TableRowColumn>
						<TableRowColumn>{node.promoType==1?'Flat':'Percent'}</TableRowColumn>
						<TableRowColumn>{node.flatDiscount}</TableRowColumn>
						<TableRowColumn>{node.discountPercent}</TableRowColumn>
					</TableRow>
  			)
			}
    </TableBody>
  </Table>
);

PromoCodeList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(PromoCodeList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on PromoCodeConnection {
				edges {
					node {
						id
						enabled
						name
						description
						start
						end
						perUserLimit
						limit
						promoType
						flatDiscount
						discountPercent
						multipleUse
						mobileOnly
						firstTimeUser
					}
				}
			}
		`
	}
})