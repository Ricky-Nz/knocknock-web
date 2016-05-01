import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getWorker } from './actions';
import WorkerPage from './WorkerPage';

const selectUsers = state => state.users;

const mapStateToProps = createSelector(
	selectUsers,
	(workers) => ({workers})
);

const mapActionToProps = dispatch => ({
	getWorker: (args) => {
		dispatch(getWorker(args));
	}
});

export default connect(mapStateToProps, mapActionToProps)(WorkerPage);