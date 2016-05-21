import React, { Component } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import { ClothListItem, PaginationSearchTitle, ClothDialog } from './components';
import { AddFloatButton } from './widgets';
import { preparePageParams } from './common';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

const prepareParams = (params, {location}) => {
	return preparePageParams(location);
};

class ClothPage extends Component {
	state = {open: false}
	onAdd = () => {
		this.setState({open: true});
	}
	onItemClick = (id) => {
		this.setState({open: true});
		this.props.relay.setVariables({selectId: id.__dataID__});
	}
	handleClose = () => {
		this.setState({open: false});
	}
	render() {
		const { open, selectId } = this.state;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill scroll padding'>
					<PaginationSearchTitle location={this.props.location}
						pagination={this.props.viewer.clothPage.pagination}/>
					<div className='flex flex-fill scroll'>
						<List ref='test'>
							{
								this.props.viewer.clothPage.datas.map((cloth, index) =>
									<ClothListItem key={index} cloth={cloth} onClick={this.onItemClick}/>)
							}
						</List>
					</div>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
				<ClothDialog ref='dialog' open={open} cloth={this.props.viewer.cloth||null}
					clothPage={this.props.viewer.clothPage} handleClose={this.handleClose}/>
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

const component = Relay.createContainer(ClothPage, {
	initialVariables: {
		search: null,
		selectId: null,
		page: 1,
		limit: 10
	},
	prepareVariables: (initial) => {
		return {
			...initial,
			fetchCloth: initial.selectId !== null
		};
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				clothPage(search: $search, page: $page, limit: $limit) {
					pagination {
						${PaginationSearchTitle.getFragment('pagination')}
					}
					datas {
						${ClothListItem.getFragment('cloth')}
					}
					${ClothDialog.getFragment('clothPage')}
				}
				cloth(id: $selectId) @include(if: $fetchCloth) {
					${ClothDialog.getFragment('cloth')}
				}
			}
		`
	}
});

export default {
	component,
	queries,
	prepareParams
};

