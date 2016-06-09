import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Toggle from 'material-ui/Toggle';
import Avatar from 'material-ui/Avatar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const CreditList = ({connection, onSelect}) => (
  <Table fixedHeader={true} onCellClick={index => onSelect(connection.edges[index].node)}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
      	<TableHeaderColumn>User</TableHeaderColumn>
        <TableHeaderColumn>Credit</TableHeaderColumn>
        <TableHeaderColumn>Payment Mode</TableHeaderColumn>
        <TableHeaderColumn>Reference No</TableHeaderColumn>
        <TableHeaderColumn>Created At</TableHeaderColumn>
        <TableHeaderColumn>Approved At</TableHeaderColumn>
        <TableHeaderColumn>Approved By</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody showRowHover={true} stripedRows={true}
    	displayRowCheckbox={false}>
			{
				connection.edges.map(({node}, index) =>
					<TableRow key={index}>
						<TableRowColumn>
							<div className='flex flex-center flex-align-center'>
								<Avatar src={node.user&&node.user.avatarUrl}/>
								<p>{`${node.user&&node.user.firstName} ${node.user&&node.user.lastName}`}</p>
							</div>
						</TableRowColumn>
						<TableRowColumn>{node.amount}</TableRowColumn>
						<TableRowColumn>{node.paymentMode}</TableRowColumn>
						<TableRowColumn>{node.paymentRefNo}</TableRowColumn>
						<TableRowColumn>{node.createdAt}</TableRowColumn>
						<TableRowColumn>{node.approvedAt}</TableRowColumn>
						<TableRowColumn>{node.approvedBy}</TableRowColumn>
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
			fragment on CreditRecordConnection {
				edges {
					node {
						user {
							userId
							firstName
							lastName
							avatarUrl
							email
						}
						amount
						paymentRefNo
						topUp
						createdAt
						paymentMode
						status
						approvedAt
						approvedBy
						description
					}
				}
			}
		`
	}
})