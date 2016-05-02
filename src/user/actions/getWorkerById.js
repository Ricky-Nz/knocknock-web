import fetch from '../../fetch';

export const ACTION_GET_USER_BY_ID = 'ACTION_GET_USER_BY_ID';

export function getWorkerById(id) {
	return (dispatch, getState) => {
		const { token } = getState();
		
		fetch({
			dispatch,
			actionName: ACTION_GET_USER_BY_ID,
			method: 'GET',
			path: `/user/worker/${id}`,
			headers: {
				'x-access-token': token
			}
		});
	};
}