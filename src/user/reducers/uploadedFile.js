import { ACTION_UPLOAD_FILE } from '../actions';

export default function (fileUrl = null, {type, running, error, data}) {
	switch(type) {
		case ACTION_UPLOAD_FILE:
			if (!running && !error && data) {
				return data.fileUrl;
			} else {
				return fileUrl;
			}
		default:
			return fileUrl;
	}
}