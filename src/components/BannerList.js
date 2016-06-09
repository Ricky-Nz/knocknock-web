import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import IconEditor from 'material-ui/svg-icons/editor/mode-edit';

class BannerList extends Component {
	render() {
		return (
			<GridList className='scroll' cols={1} cellHeight={150} padding={16}>
				{
					this.props.connection.edges.map(({node}, index) =>
						<GridTile key={index} title={
							<div>
								<div>{node.title}</div>
								{node.link&&<a href={node.link} target='_blank' style={styles.a}>{node.link}</a>}
							</div>
						} titlePosition='bottom'
							cols={1} rows={1} actionIcon={<IconButton onClick={() => this.props.onSelect(node)}><IconEditor color='white'/></IconButton>}>
							<img src={node.imageUrl}/>
						</GridTile>
					)
				}
			</GridList>
		);
	}
}

BannerList.propTypes = {
	onSelect: PropTypes.func.isRequired
};

const styles = {
	a: {
		color: 'white'
	}
};

export default Relay.createContainer(BannerList, {
	fragments: {
		connection: () => Relay.QL`
			fragment on BannerConnection {
				edges {
					node {
						id
						enabled
						title
						link
						position
						imageUrl
					}
				}
			}
		`
	}
});