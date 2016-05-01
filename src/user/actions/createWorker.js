import fetch from '../../fetch';

export const ACTION_CREATE_WORKER = 'ACTION_CREATE_WORKER';

export function createWorker(body, avatar) {
	return (dispatch, getState) => {
		const { token } = getState();
		
		fetch({
			dispatch,
			actionName: ACTION_CREATE_WORKER,
			method: 'POST',
			path: '/user/worker',
			headers: {
				'x-access-token': token
			},
			body,
			attachments: avatar&&{
				avatar
			}
		});
	};
}