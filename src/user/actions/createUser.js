import fetch from '../../fetch';

export const ACTION_CREATE_USER = 'ACTION_CREATE_USER';

export function createUser(role, data) {
	return (dispatch, getState) => {
		const { token } = getState();
		
		fetch({
			dispatch,
			actionName: ACTION_CREATE_USER,
			method: 'POST',
			path: `/user/${role}`,
			headers: {
				'x-access-token': token
			},
			body: data
		});
	};
}