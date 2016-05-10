import { ACTION_NAVIGATE, ACTION_PAGINATION_FETCH } from '../actions';

const defaultConfig = {
	currentPage: 1,
	totalPage: 0,
	pageSize: 5
};

export default function (pagination = defaultConfig, {type, running, arg, error, data}) {
	switch(type) {
		case ACTION_NAVIGATE:
			return {...pagination, currentPage: data.page,
					pageSize: data.pageSize};
		case ACTION_PAGINATION_FETCH:
			if (!running && data) {
				return {...pagination, totalPage: Math.ceil(data.total/arg.pageSize)};
			} else {
				return pagination;
			}
		case '@@router/LOCATION_CHANGE':
			return defaultConfig;
		default:
			return pagination;
	}
}