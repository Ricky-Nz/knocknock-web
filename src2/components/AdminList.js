import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import AdminListItem from './AdminListItem';
import { List } from 'material-ui/List';

class AdminList extends Component {
	render() {
		return (
			<List className='scroll' style={styles.scrollBug}>
				{
					this.props.connection.edges.map(({node}, index) =>
						<Paper key={index} className='margin-bottom'>
							<AdminListItem admin={node}
								onClick={this.props.onSelect}/>
						</Paper>
					)
				}
			</List>
		);
	}
}

AdminList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

const styles = {
	scrollBug: {
		padding: '0 2'
	}
};

export default Relay.createContainer(AdminList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on AdminConnection {
				edges {
					node {
						${AdminListItem.getFragment('admin')}
					}
				}
			}
		`
	}
});