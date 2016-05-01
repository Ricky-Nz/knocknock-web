import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class WorkerPage extends Component {
	componentDidMount() {
		this.props.getWorker();
	}
	onCreate = () => {
		this.context.router.push('/dashboard/worker/create');
	}
	render() {
		return (
			<div className='flex flex-fill position-relative'>
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