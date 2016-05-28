import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import FactoryListItem from './FactoryListItem';
import { List } from 'material-ui/List';

class FactoryList extends Component {
	render() {
		return (
			<List>
				{
					this.props.connection.edges.map(({node}, index) =>
						<FactoryListItem key={index} factory={node}
							onAction={this.props.onAction}/>)
				}
			</List>
		);
	}
}

FactoryList.propTypes = {
	onAction: PropTypes.func.isRequired
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