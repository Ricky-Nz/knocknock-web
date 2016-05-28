import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AutoComplete from 'material-ui/AutoComplete';
import ClothMenuItem from './ClothMenuItem';

class ClothInputAutoComplete extends Component {
	state = {
		search: null
	}
	onUpdateInput = (search) => {
		this.setState({search});
	}
	onNewRequest = (select, index) => {
		this.props.onSelect(this.props.viewer.workers.edges[index].node);
	}
	render() {
		const search = this.state.search;
		let edges = this.props.viewer.clothes.edges;
		if (search) {
			edges = edges.filter(({node}) =>
				(node.nameCn&&(node.nameCn.indexOf(search) >= 0)
					|| node.nameEn&&(node.nameEn.indexOf(search) >= 0)));
		}

		const dataSource = edges.map(({node}, index) =>
				({text: `${node.nameEn}(${node.nameCn})`, value: <ClothMenuItem index={index} cloth={node}/>}));

		return (
	    <AutoComplete hintText='search' floatingLabelText='Select Product'
	      dataSource={dataSource} onUpdateInput={this.onUpdateInput} onNewRequest={this.onNewRequest}/>
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
				clothes(first:500) {
					edges {
						node {
							nameCn
							nameEn
							${ClothMenuItem.getFragment('cloth')}
						}
					}
				}
			}
		`
	}
});