import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { AddFloatButton } from './widgets';
import { PaginationSearchBar, PromoCodeList, PromoCodeDialog } from './components';
import { pageInfoFragment, paginationVariables } from './utils';

class PromoCodeBrowserPage extends Component {
	state = {
		dialogShow: false,
		selectPromoCode: null
	}
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search:text});
	}
	onAdd = () => {
		this.setState({dialogShow: true, selectPromoCode: null});
	}
	handleClose = () => {
		this.setState({dialogShow: false});
	}
	onSelectPromoCode = (promoCode) => {
		this.setState({selectPromoCode: promoCode, dialogShow: true});
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchBar pageInfo={this.props.viewer.promoCodes.pageInfo}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<br/>
					<PromoCodeList connection={this.props.viewer.promoCodes} onSelect={this.onSelectPromoCode}/>
				</div>
				<AddFloatButton className='page-float-button' onClick={this.onAdd}/>
				<PromoCodeDialog viewer={this.props.viewer} handleClose={this.handleClose}
					open={this.state.dialogShow} promoCode={this.state.selectPromoCode}/>
			</div>
		);
	}
}

export default Relay.createContainer(PromoCodeBrowserPage, {
	...paginationVariables(),
	fragments: {
		viewer: (variables) => {
			return Relay.QL`
				fragment on Viewer {
					promoCodes(search:$search,first:$first,after:$after) @skip(if: $reverse) {
						${PromoCodeList.getFragment('connection')}
						pageInfo {
			        ${pageInfoFragment}
						}
					}
					promoCodes(search:$search,last:$last,before:$before) @include(if: $reverse) {
						${PromoCodeList.getFragment('connection')}
						pageInfo {
			        ${pageInfoFragment}
						}
					}
					${PromoCodeDialog.getFragment('viewer')}
				}
			`;
		}
	}
});

