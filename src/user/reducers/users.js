import { ACTION_GET_WORKER } from '../actions';

export default function (workers = null, {type, running, error, data}) {
	switch(type) {
		case ACTION_GET_WORKER:
			if (!running && !error && data) {
				return workers?[...workers, ...data]:data;
			} else {
				return workers;
			}
		default:
			return workers;
	}
}