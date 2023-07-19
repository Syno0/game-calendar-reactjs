import {useQuery} from 'react-query';
// import { refreshJwtToken } from './jwt_refresh';

export function useGetGamesBetweenDates(start_date, end_date) {
	return useQuery([process.env.REACT_APP_BACK_URL + "/games", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			start_date,
			end_date,
		}),
	}]);
}