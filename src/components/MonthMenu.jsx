import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import * as dayjs from 'dayjs';

function MonthMenu({currentMonth, setCurrentMonth, currentYear}) {

	function pushMonth(month, opacity) {
		return {
			number: month.format('M'),
			display: month.format('MMMM'),
			opacity
		}
	}

	function getAsideMonths(month) {
		const monthArray = [pushMonth(month, '100%')];
		monthArray.push(pushMonth(month.add(1, 'month'), '50%'));
		monthArray.push(pushMonth(month.add(2, 'month'), '25%'));
		monthArray.unshift(pushMonth(month.subtract(1, 'month'), '50%'));
		monthArray.unshift(pushMonth(month.subtract(2, 'month'), '25%'));
		return monthArray;
	}

	return (
		<Grid xs={12} marginTop={5} paddingBottom={0}>
			{getAsideMonths(currentMonth).map((month, index) => (
				<span
					key={index}
					className="month"
					style={{ opacity: month.opacity }}
					onClick={() => setCurrentMonth(dayjs().year(currentYear).month(--month.number))}
				>
					{month.display}
				</span>
			))}
		</Grid>
	);
}

export default MonthMenu;
