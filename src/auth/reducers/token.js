import { ACTION_LOGIN, ACTION_LOGOUT } from '../actions';

export default function (token = localStorage['TOKEN']||null, {type, error, data}) {
	switch(type) {
		case ACTION_LOGIN:
			if (data&&data.token) {
				localStorage.setItem('TOKEN', data.token);
				return data.token;
			} else {
				return null;
			}
		case ACTION_LOGOUT:
			localStorage.removeItem('TOKEN');
			return null;
		default:
			return token;
	}
}