import { ACTION_UPLOAD_FILE, ACTION_CREATE_WORKER } from '../actions';
import { processStatus } from '../../utils';

export default function (status = {}, action) {
	switch(action.type) {
		case ACTION_UPLOAD_FILE:
			return processStatus(action, 'uploading', status);
		case ACTION_CREATE_WORKER:
			return processStatus(action, 'processing', status);
		default:
			return status;
	}
}