import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const FeedbackList = ({connection}) => (
  <Table fixedHeader={true}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
      	<TableHeaderColumn>User</TableHeaderColumn>
        <TableHeaderColumn>Rate</TableHeaderColumn>
        <TableHeaderColumn>Comment</TableHeaderColumn>
        <TableHeaderColumn>Source</TableHeaderColumn>
        <TableHeaderColumn>Date</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody showRowHover={true} stripedRows={true}
    	displayRowCheckbox={false}>
			{
				connection.edges.map(({node}, index) =>
					<TableRow key={index}>
						<TableRowColumn><Avatar src={node.user.avatarUrl}/></TableRowColumn>
						<TableRowColumn>{node.rating}</TableRowColumn>
						<TableRowColumn>{node.comment}</TableRowColumn>
						<TableRowColumn>{node.source}</TableRowColumn>
						<TableRowColumn>{node.createdAt}</TableRowColumn>
					</TableRow>
  			)
			}
    </TableBody>
  </Table>
);

export default Relay.createContainer(FeedbackList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on FeedbackConnection {
				edges {
					node {
						userId
						rating
						comment
						source
						createdAt
						user {
							avatarUrl
							name
						}
					}
				}
			}
		`
	}
})