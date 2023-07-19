import React from "react";
import Day from "./Day";
import { useGetGamesBetweenDates } from "../helpers/igdb_api";
import * as dayjs from 'dayjs';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";

function Calendar() {

	const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
	const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
	const nbDaysInMonth = dayjs().daysInMonth();
	let daysInMonth = [];
	for (let i = 1; i <= nbDaysInMonth; i++) daysInMonth.push(i);

	let { data, isFetching, isError } = useGetGamesBetweenDates(startOfMonth, endOfMonth);

	return (
		<div className="calendar">
			Calendar
			<br /><br />
			<Grid container spacing={4}>
				{isFetching ? (
					<div>Loading ...</div>
				) : isError ? (
					<div>Sorry, an error occured :(</div>
				) : (!data || typeof data === 'undefined' || data.length === 0) ? (
					<div>Missing data :/</div>
				) : (
					daysInMonth.map((day) => (
						<Day
							key={day}
							day={day}
							games={data.filter(
								(game) => parseInt(game.day) === day
							)}
						/>
					))
				)}
			</Grid>
		</div>
	);
}

export default Calendar;
