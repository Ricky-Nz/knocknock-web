import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import WorkerListItem from './WorkerListItem';
import { SearchBar } from '../../widgets';

class WorkerPage extends Component {
	componentDidMount() {
		this.props.getWorker();
	}
	onCreate = () => {
		this.context.router.push('/dashboard/worker/create');
	}
	onSearch = (text) => {
		this.props.getWorker({search: text});
	}
	render() {
		const { workers } = this.props;

		return (
			<div className='flex flex-fill position-relative'>
				<Paper className='margin padding-horizontal'>
					<SearchBar onSearch={this.onSearch}/>
				</Paper>
				<List>
					{workers&&workers.map((worker, index) =>
						<WorkerListItem key={index} {...worker}
							onClick={() => this.context.router.push(`/dashboard/worker/${worker.id}`)}/>)}
				</List>
			  <FloatingActionButton style={styles.floatButton} onClick={this.onCreate}>
			    <ContentAdd/>
			  </FloatingActionButton>
			</div>
		);
	}
}

WorkerPage.propTypes = {
	getWorker: PropTypes.func.isRequired,
	workers: PropTypes.arrayOf(PropTypes.object)
};

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