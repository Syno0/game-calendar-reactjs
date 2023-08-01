import {useQuery} from 'react-query';
// import { refreshJwtToken } from './jwt_refresh';

export function useGetGames(start_date, end_date, {hypes, score, platform}) {
	return useQuery([process.env.REACT_APP_BACK_URL + "/games", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			start_date,
			end_date,
			hypes,
			score,
			platform
		}),
	}]);
}

export function useGetPlatforms() {
	return useQuery([process.env.REACT_APP_BACK_URL + "/platforms", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	}]);
}