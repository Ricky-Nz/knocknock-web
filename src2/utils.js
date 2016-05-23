export const preparePageParams = (location) => {
	return {
		first: parseInt(location.query.first||10),
		after: location.query.after||null,
		search: location.query.search||null
	};
};