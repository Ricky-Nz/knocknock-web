import fetch from '../../fetch';

export const ACTION_LOGIN = 'ACTION_LOGIN';

export function logIn({username, password}) {
	return (dispatch, getState) => {

		fetch({
			dispatch,
			actionName: ACTION_LOGIN,
			method: 'PUT',
			path: '/login/backend',
			body: {
				username,
				password
			}
		});
	};
}