import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AutoComplete from 'material-ui/AutoComplete';
import ClothMenuItem from './ClothMenuItem';

class ClothInputAutoComplete extends Component {
	onNewRequest = (select, index) => {
		const node = this.props.viewer.clothes.edges[index].node;
		this.props.onSelect({
			productId: node.id,
			cloth: {
				imageUrl: node.imageUrl,
				nameCn: node.nameCn,
				nameEn: node.nameEn
			}
		});
	}
	render() {
		const dataSource = this.props.viewer.clothes.edges.map(({node}, index) =>
				({text: `${node.nameEn}(${node.nameCn})`, value: <ClothMenuItem index={index} cloth={node}/>}));

		return (
	    <AutoComplete hintText='search' floatingLabelText='Select Product'
	      dataSource={dataSource} filter={AutoComplete.caseInsensitiveFilter}
	      onNewRequest={this.onNewRequest} fullWidth={this.props.fullWidth}/>
		);
	}
}

ClothInputAutoComplete.propTypes = {
	onSelect: PropTypes.func.isRequired
};

export default Relay.createContainer(ClothInputAutoComplete, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				clothes(first:10) {
					edges {
						node {
							id
							nameCn
							nameEn
							imageUrl
							${ClothMenuItem.getFragment('cloth')}
						}
					}
				}
			}
		`
	}
});