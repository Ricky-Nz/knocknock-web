import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { createUser, uploadFile, getUser, updateUser } from './actions';
import UserCreateEditPage from './UserCreateEditPage';

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
	submit: (role, id, data) => {
		if (id) {
			dispatch(updateUser(role, id, data));
		} else {
			dispatch(createUser(role, data));
		}
	},
	getUser: (id) => {
		dispatch(getUser(id));
	}
});

export default connect(mapStateToProps, mapActionToProps)(UserCreateEditPage);