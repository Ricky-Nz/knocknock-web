import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import CategoryList from './CategoryList';
import CategoryDialog from './CategoryDialog';
import PaginationSearchBar from './PaginationSearchBar';
import { AddFloatButton, SearchBar } from '../widgets';
import { paginationVariables } from '../utils';

class CategoryTab extends Component {
	state = {
		editorShow: false,
		selected: null
	}
	handleEditorClose = () => {
		this.setState({
			editorShow: false
		});	
	}
	onNewItem = () => {
		this.setState({
			editorShow: true,
			selected: null
		});
	}
	onItemAction = (category, action) => {
		switch(action) {
			case 'EDIT':
				this.setState({
					editorShow: true,
					selected: category
				});
				break;
			case 'VIEW':
				this.props.onSelectCategory(category);
				break;
		}
	}
	onSearch = (text) => {
		this.setState({search: text});
	}
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	render() {
		const { first, after, last, before } = this.props.relay.variables;
		const { editorShow, selected, search } = this.state;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<PaginationSearchBar pageInfo={this.props.viewer.categories.pageInfo}
						first={first} after={after} last={last} before={before}
						onSearch={this.onSearch} onNavigate={this.onNavigate}/>
					<br/>
					<CategoryList connection={this.props.viewer.categories}
						onAction={this.onItemAction}/>
				</div>
				<AddFloatButton className='page-float-button' onClick={this.onNewItem}/>
				<CategoryDialog viewer={this.props.viewer} category={selected}
					handleClose={this.handleEditorClose} open={editorShow}/>
			</div>
		);
	}
}

CategoryTab.propTypes = {
	onSelectCategory: PropTypes.func.isRequired
};

export default Relay.createContainer(CategoryTab, {
	...paginationVariables(),
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				categories(search:$search,first:$first,after:$after) @skip(if: $reverse) {
					${CategoryList.getFragment('connection')}
					pageInfo {
		        hasNextPage
		        hasPreviousPage
		        endCursor
		        startCursor
					}
				}
				categories(search:$search,last:$last,before:$before) @include(if: $reverse) {
					${CategoryList.getFragment('connection')}
					pageInfo {
		        hasNextPage
		        hasPreviousPage
		        endCursor
		        startCursor
					}
				}
				${CategoryDialog.getFragment('viewer')}
			}
		`
	}
});

