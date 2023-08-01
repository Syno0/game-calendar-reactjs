import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

function YearMenu({currentYear, setCurrentYear, currentMonth, setCurrentMonth}) {

	function pushYear(year, opacity) {
		return {
			year,
			opacity
		}
	}

	function getAsideMonths(year) {
		const monthArray = [pushYear(year, '100%')];
		monthArray.push(pushYear(year+1, '50%'));
		monthArray.push(pushYear(year+2, '25%'));
		monthArray.unshift(pushYear(year-1, '50%'));
		monthArray.unshift(pushYear(year-2, '25%'));
		return monthArray;
	}

	return (
		<Grid xs={12}>
			{getAsideMonths(currentYear).map((year, index) => (
				<span
					key={index}
					className="year"
					style={{ opacity: year.opacity }}
					onClick={() => {
						setCurrentYear(year.year);
						setCurrentMonth(currentMonth.year(year.year))
					}}
				>
					{year.year}
				</span>
			))}
		</Grid>
	);
}

export default YearMenu;
