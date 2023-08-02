import React, { useState } from "react";
import { useGetGames } from "../helpers/igdb_api";
import * as dayjs from 'dayjs';

// Components
import Day from "./Day";
import MonthMenu from "./MonthMenu";
import YearMenu from "./YearMenu";
import Filters from "./Filters";
import InfoModal from "./InfoModal";

// MUI
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

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

	// Modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [modalGame, setModalGame] = useState(null);

	// Filter
	const [hypesFilter, setHypesFilter] = useState(1);
	const [scoreFilter, setScoreFilter] = useState(false);
	// Default platforms filters
	const [platformFilter, setPlatformFilter] = useState([]);

	// Fetching Data
	let { data, isFetching, isError } = useGetGames(startOfMonth, endOfMonth, {
		hypes: hypesFilter,
		score: scoreFilter,
		platform: platformFilter
	});

	function isToday(day, month, year) {
		month = month.format('MM');
		if(dayjs().format('YYYY-MM-DD') === `${year}-${month}-${day.toString().padStart(2, '0')}`)
			return true;
		return false;
	}

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
				<Filters
					setHypesFilter={setHypesFilter}
					scoreFilter={scoreFilter}
					setScoreFilter={setScoreFilter}
					platformFilter={platformFilter}
					setPlatformFilter={setPlatformFilter}
				/>
			</Grid>
			<Grid container spacing={4}>
				{isFetching ? (
					<Box style={{margin: 'auto'}} sx={{ width: '50%' }}>
						<LinearProgress style={{marginTop: '100px'}} />
					</Box>
				) : !data ||
				  typeof data === "undefined" ||
				  isError ? (
					<div xs={12} style={{margin: 'auto'}}>Sorry, an error occured :(</div>
				) : (
					<>
						<Grid xs={12} style={{margin: 'auto'}}><small>Found: {data.length}</small></Grid>
						{daysInMonth.map((day) => (
							<Day
								key={day}
								day={day}
								handleOpen={handleOpen}
								setModalGame={setModalGame}
								isToday={() => isToday(day, currentMonth, currentYear)}
								games={data
									.filter((game) => parseInt(game.day) === day)
									.sort((a, b) => {
										// Spotlight define by hypes + follow + total rating
										const scoreA = a.hypes + a.follow + Math.round(a.total_rating);
										const scoreB = b.hypes + a.follow + Math.round(b.total_rating);
										if (scoreA < scoreB) return 1;
										if (scoreA > scoreB) return -1;
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
