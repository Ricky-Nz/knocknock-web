import React, { Component } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import ClothList from './ClothList';
import ClothDialog from './ClothDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import CategorySelectMenu from './CategorySelectMenu';
import { AddFloatButton, SearchBar } from '../widgets';

class CategoryTab extends Component {
	state = {
		alertShow: false,
		editorShow: false,
		selected: null,
		search: null,
		selectedCategoryId: null
	}
	handleEditorClose = () => {
		this.setState({
			editorShow: false,
			selected: null
		});	
	}
	handAlertClose = () => {
		this.setState({
			alertShow: false,
			selected: null
		});
	}
	onNewItem = () => {
		this.setState({
			editorShow: true
		});
	}
	onSearch = (text) => {
		this.setState({search: text});
	}
	onItemAction = (cloth, action) => {
		switch(action) {
			case 'EDIT':
				this.setState({
					editorShow: true,
					selected: cloth
				});
				break;
			case 'DELETE':
				this.setState({
					alertShow: true,
					selected: cloth
				});
				break;
			default:
		}
	}
	onSelectCategory = (categoryId) => {
		this.setState({selectedCategoryId: categoryId});
	}
	render() {
		const { editorShow, alertShow, selected, search, selectedCategoryId } = this.state;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill scroll padding'>
					<Paper>
						<div className='flex flex-row flex-space-between padding-horizontal'>
							<SearchBar hintText='search by cloth name' onSearch={this.onSearch}/>
							<CategorySelectMenu connection={this.props.viewer.categories}
								selectId={selectedCategoryId} onSelect={this.onSelectCategory} defaultAll={true}/>
						</div>
					</Paper>
					<ClothList connection={this.props.viewer.clothes} search={search}
						categoryId={selectedCategoryId} onAction={this.onItemAction}/>
				</div>
				<ClothDialog viewer={this.props.viewer} clothId={selected&&selected.id}
					handleClose={this.handleEditorClose} open={editorShow}/>
				<AddFloatButton style={styles.floatButton} onClick={this.onNewItem}/>
				<DeleteConfirmDialog viewer={this.props.viewer} open={alertShow}
	      	handleClose={this.handAlertClose} cloth={selected}/>
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

export default Relay.createContainer(CategoryTab, {
	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				clothes(first: 1000) {
					${ClothList.getFragment('connection')}
				}
				categories(first: 1000) {
					${CategorySelectMenu.getFragment('connection')}
				}
				${ClothDialog.getFragment('viewer')}
				${DeleteConfirmDialog.getFragment('viewer')}
			}
		`
	}
});

