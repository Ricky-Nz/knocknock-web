export const ACTION_SEARCH = 'ACTION_SEARCH';

export function search(text) {
	return {
		type: ACTION_SEARCH,
		data: text
	};
}