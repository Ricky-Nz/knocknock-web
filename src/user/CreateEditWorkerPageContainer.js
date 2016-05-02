import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { createWorker, uploadFile, getWorkerById } from './actions';
import CreateEditWorkerPage from './CreateEditWorkerPage';

const selectUploadedFile = state => state.uploadedFile;

const selectUploadingStatus = state => state.userStatus.uploading;

const selectProcessingStatus = state => state.userStatus.processing;

const selectResultStatus = state => state.userStatus.processSuccess;

const mapStateToProps = createSelector(
	selectUploadedFile,
	selectUploadingStatus,
	selectProcessingStatus,
	selectResultStatus,
	(uploadedFile, uploading, processing, processSuccess) =>
		({uploadedFile, uploading, processing, processSuccess})
);

const mapActionToProps = dispatch => ({
	uploadFile: (avatar) => {
		dispatch(uploadFile(avatar));
	},
	createWorker: (args) => {
		dispatch(createWorker(args));
	},
	getWorkerById: (id) => {
		dispatch(getWorkerById(id));
	}
});

export default connect(mapStateToProps, mapActionToProps)(CreateEditWorkerPage);