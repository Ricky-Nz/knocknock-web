import fetch from '../../fetch';

export const ACTION_PAGINATION_FETCH = 'ACTION_PAGINATION_FETCH';

export function getWorker(page, pageSize) {
	return (dispatch, getState) => {
		const { token } = getState();
		
		fetch({
			dispatch,
			actionName: ACTION_PAGINATION_FETCH,
			arg: {
				page,
				pageSize
			},
			method: 'GET',
			path: '/user/worker',
			headers: {
				'x-access-token': token
			},
			params: {
				page,
				limit: pageSize
			}
		});
	};
}