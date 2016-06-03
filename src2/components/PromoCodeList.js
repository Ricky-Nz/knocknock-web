import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Toggle from 'material-ui/Toggle';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const PromoCodeList = ({connection, onSelect}) => (
  <Table fixedHeader={true} onCellClick={index => onSelect(connection.edges[index].node)}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
      	<TableHeaderColumn>Enabled</TableHeaderColumn>
        <TableHeaderColumn>Code</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Start</TableHeaderColumn>
        <TableHeaderColumn>End</TableHeaderColumn>
        <TableHeaderColumn>Type</TableHeaderColumn>
        <TableHeaderColumn>Value</TableHeaderColumn>
        <TableHeaderColumn>Amount</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody showRowHover={true} stripedRows={true}
    	displayRowCheckbox={false}>
			{
				connection.edges.map(({node}, index) =>
					<TableRow key={index}>
						<TableRowColumn><Toggle toggled={node.enabled}/></TableRowColumn>
						<TableRowColumn>{node.code}</TableRowColumn>
						<TableRowColumn>{node.name}</TableRowColumn>
						<TableRowColumn>{node.start}</TableRowColumn>
						<TableRowColumn>{node.end}</TableRowColumn>
						<TableRowColumn>{node.promoType}</TableRowColumn>
						<TableRowColumn>{node.promoValue}</TableRowColumn>
						<TableRowColumn>{node.amount}</TableRowColumn>
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
						code
						name
						description
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
				}
			}
		`
	}
})