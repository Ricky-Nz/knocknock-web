import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { AddFloatButton } from './widgets';
import { PaginationSearchTitle, PromoCodeList, PromoCodeDialog } from './components';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

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
					<div className='padding'>
						<Paper className='padding-horizontal'>
							<PaginationSearchTitle pageInfo={this.props.viewer.promoCodes.pageInfo}
								first={first} after={after} last={last} before={before}
								onSearch={this.onSearch} onNavigate={this.onNavigate}/>
						</Paper>
					</div>
					<div className='flex flex-fill scroll'>
						<PromoCodeList connection={this.props.viewer.promoCodes} onSelect={this.onSelectPromoCode}/>
					</div>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
				<PromoCodeDialog viewer={this.props.viewer} handleClose={this.handleClose}
					open={this.state.dialogShow} promoCode={this.state.selectPromoCode}/>
			</div>
		);
	}
}

const styles = {
	floatButton: {
		position: 'absolute',
		right: 24,
		bottom: 24
	}
};

const component = Relay.createContainer(PromoCodeBrowserPage, {
	initialVariables: {
		search: null,
		first: 10,
		last: 0,
		after: null,
		before: null,
		reverse: false
	},
	prepareVariables: (variables) => {
		return {
			...variables,
			reverse: variables.last > 0
		}
	},
	fragments: {
		viewer: (variables) => {
			return Relay.QL`
				fragment on Viewer {
					promoCodes(search:$search,first:$first,after:$after) @skip(if: $reverse) {
						${PromoCodeList.getFragment('connection')}
						pageInfo {
			        hasNextPage
			        hasPreviousPage
			        endCursor
			        startCursor
						}
					}
					promoCodes(search:$search,last:$last,before:$before) @include(if: $reverse) {
						${PromoCodeList.getFragment('connection')}
						pageInfo {
			        hasNextPage
			        hasPreviousPage
			        endCursor
			        startCursor
						}
					}
					${PromoCodeDialog.getFragment('viewer')}
				}
			`;
		}
	}
});

export default {
	component,
	queries
};

