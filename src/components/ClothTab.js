import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import ClothList from './ClothList';
import ClothDialog from './ClothDialog';
import PaginationSearchBar from './PaginationSearchBar';
import CategorySelectMenu from './CategorySelectMenu';
import { AddFloatButton } from '../widgets';
import { paginationVariables } from '../utils';

class CategoryTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogShow: false,
			selected: null
		};
		props.relay.setVariables({categoryId: props.defaultCategoryId});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.defaultCategoryId !== this.props.defaultCategoryId) {
			nextProps.relay.setVariables({categoryId: nextProps.defaultCategoryId});
		}
	}
	handleClose = () => {
		this.setState({
			dialogShow: false
		});	
	}
	onNewItem = () => {
		this.setState({
			dialogShow: true,
			selected: null
		});
	}
	onSearch = (text) => {
		this.props.relay.setVariables({search: text});
	}
	onNavigate = (pagination) => {
		this.props.relay.setVariables(pagination);
	}
	onSelectCloth = (cloth) => {
		this.setState({
			dialogShow: true,
			selected: cloth
		});
	}
	onSelectCategory = (categoryId) => {
		this.props.relay.setVariables({categoryId});
	}
	render() {
		const { first, after, last, before, categoryId } = this.props.relay.variables;
		const { dialogShow, selected } = this.state;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding'>
					<div className='flex flex-row'>
						<div className='flex flex-fill'>
							<PaginationSearchBar pageInfo={this.props.viewer.clothes.pageInfo}
								first={first} after={after} last={last} before={before}
								onSearch={this.onSearch} onNavigate={this.onNavigate}/>
						</div>
						<Paper className='padding-horizontal margin-left'>
							<CategorySelectMenu connection={this.props.viewer.categories}
								selectId={categoryId} onSelect={this.onSelectCategory} defaultAll={true}/>
						</Paper>
					</div>
					<br/>
					<ClothList connection={this.props.viewer.clothes} onSelect={this.onSelectCloth}/>
				</div>
				<ClothDialog viewer={this.props.viewer} clothId={selected&&selected.id}
					handleClose={this.handleClose} open={dialogShow}
					defaultCategoryId={categoryId}/>
				<AddFloatButton className='page-float-button' onClick={this.onNewItem}/>
			</div>
		);
	}
}

CategoryTab.propTypes = {
	defaultCategoryId: PropTypes.string
};

export default Relay.createContainer(CategoryTab, {
	initialVariables: {
		search: null,
		first: 10,
		last: 0,
		after: null,
		before: null,
		reverse: false,
		categoryId: null
	},
	prepareVariables: (variables) => {
		return {
			...variables,
			reverse: variables.last > 0
		}
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				clothes(search:$search,categoryId:$categoryId,first:$first,after:$after) @skip(if: $reverse) {
					${ClothList.getFragment('connection')}
					pageInfo {
		        hasNextPage
		        hasPreviousPage
		        endCursor
		        startCursor
					}
				}
				clothes(search:$search,categoryId:$categoryId,last:$last,before:$before) @include(if: $reverse) {
					${ClothList.getFragment('connection')}
					pageInfo {
		        hasNextPage
		        hasPreviousPage
		        endCursor
		        startCursor
					}
				}
				categories(first: 1000) {
					${CategorySelectMenu.getFragment('connection')}
				}
				${ClothDialog.getFragment('viewer')}
			}
		`
	}
});

