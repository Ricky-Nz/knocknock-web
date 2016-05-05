export const ACTION_NAVIGATE = 'ACTION_NAVIGATE';

export function navigate(page, pageSize) {
	return {
		type: ACTION_NAVIGATE,
		data: {
			page,
			pageSize
		}
	};
}