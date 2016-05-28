import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import CategoryList from './CategoryList';
import CategoryDialog from './CategoryDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { AddFloatButton, SearchBar } from '../widgets';

class CategoryTab extends Component {
	state = {
		alertShow: false,
		editorShow: false,
		selected: null,
		search: null
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
	onItemAction = (category, action) => {
		switch(action) {
			case 'EDIT':
				this.setState({
					editorShow: true,
					selected: category
				});
				break;
			case 'DELETE':
				this.setState({
					alertShow: true,
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
	render() {
		const { editorShow, alertShow, selected, search } = this.state;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill scroll padding'>
					<Paper>
						<div className='flex flex-row padding-horizontal'>
							<SearchBar hintText='search by category name'
								onSearch={this.onSearch} fullWidth={true}/>
						</div>
					</Paper>
					<CategoryList connection={this.props.viewer.categories}
						search={search} onAction={this.onItemAction}/>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onNewItem}/>
				<CategoryDialog viewer={this.props.viewer} category={selected}
					handleClose={this.handleEditorClose} open={editorShow}/>
				<DeleteConfirmDialog viewer={this.props.viewer} open={alertShow}
	      	handleClose={this.handAlertClose} category={selected}/>
			</div>
		);
	}
}

CategoryTab.propTypes = {
	onSelectCategory: PropTypes.func.isRequired
};

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
				categories(first: 1000) {
					${CategoryList.getFragment('connection')}
				}
				${CategoryDialog.getFragment('viewer')}
				${DeleteConfirmDialog.getFragment('viewer')}
			}
		`
	}
});

