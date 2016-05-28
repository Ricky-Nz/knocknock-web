export const preparePageParams = ({query}) => {
	if (query.first) {
		return {
			first: parseInt(query.first||5),
			after: query.after||null,
			search: query.search||null
		};
	} else {
		return {
			last: parseInt(query.last||5),
			before: query.before||null,
			search: query.search||null
		};
	}
};
