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
				<div className='flex flex-fill scroll padding'>
					<PaginationSearchTitle location={this.props.location}
						pagination={this.props.viewer.clothPage.pagination}/>
					<div className='flex flex-fill scroll'>
						<List>
							{
								this.props.viewer.clothPage.datas.map((cloth, index) =>
									<ClothListItem key={index} cloth={cloth}/>)
							}
						</List>
					</div>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
				<ClothDialog open={open} selectId={selectId} viewer={this.props.viewer}
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
		page: 1,
		limit: 10
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
				${ClothDialog.getFragment('viewer')}
			}
		`
	}
});

export default {
	component,
	queries,
	prepareParams
};

