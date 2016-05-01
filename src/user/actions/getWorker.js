import fetch from '../../fetch';

export const ACTION_GET_WORKER = 'ACTION_GET_WORKER';

export function getWorker(params) {
	return (dispatch, getState) => {
		const { token } = getState();
		
		fetch({
			dispatch,
			actionName: ACTION_GET_WORKER,
			method: 'GET',
			path: '/user/worker',
			headers: {
				'x-access-token': token
			},
			params
		});
	};
}