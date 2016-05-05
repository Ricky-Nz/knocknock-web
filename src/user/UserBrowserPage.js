import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import WorkerListItem from './WorkerListItem';
import { PaginationList, SearchBar } from '../app';

class WorkerPage extends Component {
	onCreate = () => {
		this.context.router.push('/dashboard/worker/create');
	}
	bindItem = (data, index) => {
		switch(this.props.params.role) {
			case 'worker':
				return (
					<WorkerListItem key={index} {...data}
						onClick={() => this.context.router.push(`/dashboard/worker/${data.id}`)}/>
				)
		}
	}
	render() {
		return (
			<div className='flex flex-fill position-relative'>
				<Paper className='margin padding-horizontal'>
					<SearchBar/>
				</Paper>
				<PaginationList role={this.props.params.role} bindItem={this.bindItem}/>
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