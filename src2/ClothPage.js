import React, { Component } from 'react';
import Relay from 'react-relay';
import { List } from 'material-ui/List';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import { ClothListItem, PaginationSearchTitle, ClothDialog } from './components';
import { AddFloatButton } from './widgets';
import { preparePageParams } from './common';
import { DeleteClothMutation } from './mutations';

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
	state = {
		open: false,
		slideIndex: 0
	}
	onAdd = () => {
		this.setState({open: true});
	}
	onItemClick = (item) => {
		this.setState({open: true});
		this.props.relay.setVariables({selectId: item.id});
	}
	onItemDelete = (item) => {
		Relay.Store.commitUpdate(new DeleteClothMutation({
			clothPage: this.props.viewer.clothPage,
			cloth: item
		}), {onSuccess: this.onSuccess, onFailure: this.onFailure})
	}
	onSuccess = () => {

	}
	onFailure = () => {

	}
	handleClose = () => {
		this.setState({open: false});
	}
	tabSelectChange = (value) => {
		this.setState({slideIndex: value});
	}
	render() {
		const { open } = this.state;
		let contentView;

		switch(this.state.slideIndex) {
			case 0:
				contentView = (
					<div className='flex flex-fill position-relative'>
						<div className='flex flex-fill scroll padding'>

						</div>
						<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
					</div>
				);
				break;
			case 1:
				contentView = (
					<div className='flex flex-fill position-relative'>
						<div className='flex flex-fill scroll padding'>
							<PaginationSearchTitle location={this.props.location}
								pagination={this.props.viewer.clothPage.pagination}/>
							<div className='flex flex-fill scroll'>
								<List ref='test'>
									{
										this.props.viewer.clothPage.datas.map((cloth, index) =>
											<ClothListItem key={index} cloth={cloth}
												onClick={this.onItemClick} onDelete={this.onItemDelete}/>)
									}
								</List>
							</div>
						</div>
						<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
						<ClothDialog ref='dialog' open={open} cloth={this.props.viewer.cloth||null}
							clothPage={this.props.viewer.clothPage} handleClose={this.handleClose}/>
					</div>
				);
				break;
		}

		return (
			<div className='flex flex-fill'>
				<Paper>
		      <Tabs onChange={this.tabSelectChange}
		        value={this.state.slideIndex}>
		        <Tab label='Categories' value={0}/>
		        <Tab label='Items' value={1}/>
		      </Tabs>
	      </Paper>
	      {contentView}
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
					${DeleteClothMutation.getFragment('clothPage')}
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

