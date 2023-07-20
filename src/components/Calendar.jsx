import React, { useState } from "react";
import { useGetGamesBetweenDates } from "../helpers/igdb_api";
import * as dayjs from 'dayjs';

// Components
import Day from "./Day";
import MonthMenu from "./MonthMenu";
import YearMenu from "./YearMenu";
import InfoModal from "./InfoModal";

// MUI
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

function Calendar() {

	// Year
	const todayYear = dayjs().format('YYYY');
	const [currentYear, setCurrentYear] = useState(parseInt(todayYear));

	// Month
	let todayMonth = dayjs().format('M');
	const [currentMonth, setCurrentMonth] = useState(dayjs().year(currentYear).month(--todayMonth));

	// Calendar
	const startOfMonth = currentMonth.startOf('month').format('YYYY-MM-DD');
	const endOfMonth = currentMonth.endOf('month').format('YYYY-MM-DD');
	const nbDaysInMonth = currentMonth.daysInMonth();
	let daysInMonth = [];
	for (let i = 1; i <= nbDaysInMonth; i++) daysInMonth.push(i);

	let { data, isFetching, isError } = useGetGamesBetweenDates(startOfMonth, endOfMonth);

	// Modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [modalGame, setModalGame] = useState(null);

	return (
		<div className="calendar">
			<Grid container spacing={4} textAlign="center">
				<MonthMenu
					currentMonth={currentMonth}
					setCurrentMonth={setCurrentMonth}
					currentYear={currentYear}
				/>
				<YearMenu
					currentYear={currentYear}
					setCurrentYear={setCurrentYear}
					currentMonth={currentMonth}
					setCurrentMonth={setCurrentMonth}
				/>
			</Grid>
			<Grid container spacing={4}>
				{isFetching ? (
					<div xs={12} style={{margin: 'auto'}}>Loading ...</div>
				) : !data ||
				  typeof data === "undefined" ||
				  isError ? (
					<div>Sorry, an error occured :(</div>
				) : (
					<>
						<Grid xs={12} style={{margin: 'auto'}}><small>Found: {data.length}</small></Grid>
						{daysInMonth.map((day) => (
							<Day
								key={day}
								day={day}
								handleOpen={handleOpen}
								setModalGame={setModalGame}
								games={data
									.filter((game) => parseInt(game.day) === day)
									.sort((a, b) => {
										if (a.hypes < b.hypes) return 1;
										if (a.hypes > b.hypes) return -1;
										return 0;
									})}
							/>
						))}
					</>
				)}
			</Grid>
			<InfoModal
				open={open}
				handleClose={handleClose}
				game={modalGame}
			/>
		</div>
	);
}

export default Calendar;
