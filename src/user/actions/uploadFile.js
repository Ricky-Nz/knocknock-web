import fetch from '../../fetch';

export const ACTION_UPLOAD_FILE = 'ACTION_UPLOAD_FILE';

export function uploadFile(avatar) {
	return (dispatch, getState) => {
		const { token } = getState();
		
		fetch({
			dispatch,
			actionName: ACTION_UPLOAD_FILE,
			method: 'POST',
			path: '/fileupload',
			headers: {
				'x-access-token': token
			},
			attachments: avatar&&{
				avatar
			}
		});
	};
}