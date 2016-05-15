import React, { Component } from 'react';
import Relay from 'react-relay';
import { ClothList, ClothEditDialog } from './components';
import { AddFloatButton } from './widgets';

class LaundryClothPanelComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {open: false, selectId: null};
	}
	onAdd = () => {
		this.setState({open: true, selectId: null});
	}
	handleClose = () => {
		this.setState({open: false});
	}
	render() {
		const { open, selectId } = this.state;

		return (
			<div className='flex flex-fill position-relative'>
				<ClothList laundryClothes={this.props.viewer.laundryClothes}/>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
				<ClothEditDialog open={open} selectId={selectId} viewer={this.props.viewer}
					handleClose={this.handleClose}/>
			</div>
		);
	}
}

const styles = {
	floatButton: {
		position: 'absolute',
		right: 48,
		bottom: 48
	}
};

export const LaundryClothPanel = Relay.createContainer(LaundryClothPanelComponent, {
	initialVariables: {
		limit: 0,
		cursor: null,
		reverse: false,
		search: null
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				laundryClothes(search: $search, first: $limit, after: $cursor) @skip(if: $reverse) {
					${ClothList.getFragment('laundryClothes')}
				}
				laundryClothes(search: $search, last: $limit, before: $cursor) @include(if: $reverse) {
					${ClothList.getFragment('laundryClothes')}
				}
				${ClothEditDialog.getFragment('viewer')}
			}
		`
	}
});