import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import { AddFloatButton } from './widgets';
import { FactoryList, FactoryDeleteDialog, FactoryEditDialog } from './components';

const queries = {
	viewer: () => Relay.QL`
		query {
			viewer
		}
	`
};

class FactoryPage extends Component {
	state = {
		deleteDialogShow: false,
		dialogShow: false,
		select: null
	}
	onItemAction = (item, action) => {
		switch(action) {
			case 'DELETE':
				this.setState({deleteDialogShow: true, select: item});
				break;
			case 'EDIT':
				this.setState({dialogShow: true, select: item});
				break;
		}
	}
	onAdd = () => {
		this.setState({dialogShow: true});
	}
	handleClose = () => {
		this.setState({dialogShow: false, select: null});
	}
	handleDeleteClose = () => {
		this.setState({deleteDialogShow: false, select: null});
	}
	render() {
		const { deleteDialogShow, dialogShow, select } = this.state;

		return (
			<div className='flex flex-fill position-relative'>
				<div className='flex flex-fill padding margin'>
					<FactoryList connection={this.props.viewer.factories}
						onAction={this.onItemAction}/>
				</div>
				<AddFloatButton style={styles.floatButton} onClick={this.onAdd}/>
				<FactoryEditDialog open={dialogShow} handleClose={this.handleClose}
					factory={select} viewer={this.props.viewer}/>
				<FactoryDeleteDialog open={deleteDialogShow} handleClose={this.handleDeleteClose}
					factory={select} viewer={this.props.viewer}/>
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

const component = Relay.createContainer(FactoryPage, {
	fragments: {
		viewer: (variables) => Relay.QL`
			fragment on Viewer {
				factories(first: 100) {
					${FactoryList.getFragment('connection')}
				}
				${FactoryEditDialog.getFragment('viewer')}
				${FactoryDeleteDialog.getFragment('viewer')}
			}
		`
	}
});

export default {
	component,
	queries
};

