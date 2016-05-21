export const preparePageParams = (location) => {
	return {
		limit: parseInt(location.query.limit||10),
		page: parseInt(location.query.page||1),
		search: location.query.search||null
	};
};