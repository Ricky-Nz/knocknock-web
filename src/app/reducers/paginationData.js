import { ACTION_PAGINATION_FETCH } from '../actions';

export default function (array = [], {type, running, arg, error, data}) {
	switch(type) {
		case ACTION_PAGINATION_FETCH:
			if (running) {
				return [];
			} else if (data) {
				return data.data||[];
			} else {
				return array;
			}
		case '@@router/LOCATION_CHANGE':
			return [];
		default:
			return array;
	}
}