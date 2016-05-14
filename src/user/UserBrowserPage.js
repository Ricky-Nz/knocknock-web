import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import WorkerListItem from './WorkerListItem';
import { PaginationList, SearchBar } from '../app';

class WorkerPage extends Component {
	onCreate = () => {
		this.context.router.push(`/dashboard/edit/${this.props.params.role}`);
	}
	bindItem = (data, index) => {
		switch(this.props.params.role) {
			case 'worker':
			case 'client':
			case 'admin':
				return (
					<WorkerListItem key={index} {...data}
						onClick={() => this.context.router.push(`/dashboard/edit/${this.props.params.role}/${data.id}`)}/>
				)
		}
	}
	render() {
		return (
			<div className='flex flex-fill position-relative'>
				<Paper className='margin padding-horizontal'>
					<SearchBar/>
				</Paper>
				<Paper className='margin-horizontal'>
					<PaginationList role={this.props.params.role} bindItem={this.bindItem}/>
			  </Paper>
			  <FloatingActionButton style={styles.floatButton} onClick={this.onCreate}>
			    <ContentAdd/>
			  </FloatingActionButton>
			</div>
		);
	}
}

WorkerPage.contextTypes = {
	router: PropTypes.object
};

const styles = {
	floatButton: {
		position: 'absolute',
		right: 48,
		bottom: 48
	}
};

export default WorkerPage;