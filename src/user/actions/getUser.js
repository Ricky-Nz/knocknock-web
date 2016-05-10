import fetch from '../../fetch';

export const ACTION_GET_USER = 'ACTION_GET_USER';

export function getUser(id, role) {
	return (dispatch, getState) => {
		const { token } = getState();
		
		fetch({
			dispatch,
			actionName: ACTION_GET_USER,
			method: 'GET',
			path: `/user/${role}/${id}`,
			headers: {
				'x-access-token': token
			}
		});
	};
}