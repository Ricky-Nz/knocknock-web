import Relay from 'react-relay';

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

export function paginationVariables(additionalParams, prepareParams) {
	return {
		initialVariables: {
			search: null,
			first: 10,
			last: 0,
			after: null,
			before: null,
			reverse: false,
			...additionalParams
		},
		prepareVariables: (variables) => {
			return {
				...variables,
				reverse: variables.last > 0,
				...prepareParams&&prepareParams(variables)
			}
		}
	};
}

export const pageInfoFragment = Relay.QL`
  fragment on PageInfo {
		hasNextPage
		hasPreviousPage
		endCursor
		startCursor
  }
`;