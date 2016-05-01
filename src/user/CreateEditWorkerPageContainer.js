import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { createWorker } from './actions';
import CreateEditWorkerPage from './CreateEditWorkerPage';

const mapActionToProps = dispatch => ({
	createWorker: (args, avatar) => {
		dispatch(createWorker(args, avatar));
	}
});

export default connect(null, mapActionToProps)(CreateEditWorkerPage);