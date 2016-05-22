import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import ClothListItem from './ClothListItem';
import { List } from 'material-ui/List';

class ClothList extends Component {
	onItemClick = (category) => {
		Relay.Store.commitUpdate(new DeleteClothMutation({
			clothPage: this.props.viewer.clothPage,
			cloth: item
		}), {onSuccess: this.onSuccess, onFailure: this.onFailure})
	}
	onDelete = (category) => {
		this.setState({open: true});
		this.props.relay.setVariables({selectId: item.id});
	}
	onSuccess = () => {

	}
	onFailure = () => {

	}
	render() {
		let clothes = this.props.viewer.clothes;
		const search = this.props.search;

		if (search) {
			clothes = clothes.filter(({nameCn, nameEn}) =>
				(nameCn&&(nameCn.indexOf(search) >= 0)
					|| nameEn&&(nameEn.indexOf(search) >= 0)));
		}

		return (
			<List>
				{
					clothes.map((cloth, index) =>
						<ClothListItem key={index} cloth={cloth}
							onClick={this.onItemClick} onDelete={this.onItemDelete}/>)
				}
			</List>
		);
	}
}

ClothList.propTypes = {
	search: PropTypes.string
};

export default Relay.createContainer(ClothList, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				clothes {
					nameCn
					nameEn
					${ClothListItem.getFragment('cloth')}
				}
			}
		`
	}
});