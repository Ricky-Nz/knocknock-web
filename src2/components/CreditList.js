import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Toggle from 'material-ui/Toggle';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const CreditList = ({connection, onSelect}) => (
  <Table fixedHeader={true} onCellClick={index => onSelect(connection.edges[index].node)}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
      	<TableHeaderColumn>User</TableHeaderColumn>
        <TableHeaderColumn>Credit</TableHeaderColumn>
        <TableHeaderColumn>Reference No</TableHeaderColumn>
        <TableHeaderColumn>Payment Mode</TableHeaderColumn>
        <TableHeaderColumn>Payment Channel</TableHeaderColumn>
        <TableHeaderColumn>Created At</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody showRowHover={true} stripedRows={true}
    	displayRowCheckbox={false}>
			{
				connection.edges.map(({node}, index) =>
					<TableRow key={index}>
						<TableRowColumn>{`${node.user.name}`}</TableRowColumn>
						<TableRowColumn>{node.value}</TableRowColumn>
						<TableRowColumn>{node.referenceNo}</TableRowColumn>
						<TableRowColumn>{node.paymentMode}</TableRowColumn>
						<TableRowColumn>{node.paymentChannel}</TableRowColumn>
						<TableRowColumn>{node.createdAt}</TableRowColumn>
						<TableRowColumn>{node.status}</TableRowColumn>
					</TableRow>
  			)
			}
    </TableBody>
  </Table>
);

CreditList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(CreditList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on TransactionConnection {
				edges {
					node {
						user {
							id
							name
							email
						}
						value
						referenceNo
						paymentMode
						paymentChannel
						status
						createdAt
					}
				}
			}
		`
	}
})