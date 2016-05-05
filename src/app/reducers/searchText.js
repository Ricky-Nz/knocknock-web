import { ACTION_SEARCH } from '../actions';

export default function (search = null, {type, data}) {
	switch(type) {
		case ACTION_SEARCH:
			return data;
		default:
			return search;
	}
}