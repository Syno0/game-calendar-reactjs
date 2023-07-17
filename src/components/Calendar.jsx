import React from "react";
import {useQuery} from 'react-query';

function Calendar() {
	console.log("RENDER");

	// function clickBtn() {
	const { data, isFetching, isError, isSuccess } = useQuery(["http://127.0.0.1:3000/games", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				start_date: "2023-09-05",
				end_date: "2023-09-07",
			}),
		}]);
	// }

	return (
		<div className="calendar">
			Calendar
			<br />
			<br />
			{/* <button onClick={clickBtn}>CLICK ME</button> */}
			{isFetching ? (
				<div>Loading ...</div>
			) : (
				<pre>{JSON.stringify(data, null, 2)}</pre>
			)}
		</div>
	);
}

export default Calendar;
