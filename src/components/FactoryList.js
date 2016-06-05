import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import FactoryListItem from './FactoryListItem';
import { List } from 'material-ui/List';

class FactoryList extends Component {
	render() {
		return (
			<List className='scroll' style={styles.scrollBug}>
				{
					this.props.connection.edges.map(({node}, index) =>
						<Paper key={index} className='margin-bottom'>
							<FactoryListItem factory={node}
								onClick={this.props.onSelect}/>
						</Paper>
					)
				}
			</List>
		);
	}
}

FactoryList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

const styles = {
	scrollBug: {
		padding: '0 2'
	}
};

export default Relay.createContainer(FactoryList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on FactoryConnection {
				edges {
					node {
						${FactoryListItem.getFragment('factory')}
					}
				}
			}
		`
	}
});