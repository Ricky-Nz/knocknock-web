import { ACTION_NAVIGATE, ACTION_PAGINATION_FETCH } from '../actions';

export default function (pagination = {
	currentPage: 1,
	totalPage: 1,
	pageSize: 5
}, {type, running, arg, error, data}) {
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
		default:
			return pagination;
	}
}