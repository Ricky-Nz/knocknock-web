export const preparePageParams = (location) => {
	return {
		limit: parseInt(location.query.limit||10),
		cursor: location.query.cursor||null,
		reverse: location.query.reverse?true:false,
		search: location.query.search||null
	};
};