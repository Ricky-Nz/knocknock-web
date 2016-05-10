import fetch from '../../fetch';

export const ACTION_UPDATE_USER = 'ACTION_UPDATE_USER';

export function updateUser(role, id, data) {
	return (dispatch, getState) => {
		const { token } = getState();
		
		fetch({
			dispatch,
			actionName: ACTION_UPDATE_USER,
			method: 'PUT',
			path: `/user/${role}/${id}`,
			headers: {
				'x-access-token': token
			},
			body: data
		});
	};
}