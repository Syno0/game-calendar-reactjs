import React, { useState } from "react";

// MUI
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from "@mui/material/Chip";

// const MenuProps = {
// 	PaperProps: {
// 		style: {
// 			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// 			width: 250,
// 		},
// 	},
// };

function Filters({hypesFilter, setHypesFilter}) {

	const hypeNScoreMarks = [
		{
			value: 0,
			label: "0",
		},
		{
			value: 25,
			label: "20",
		},
		{
			value: 50,
			label: "50",
		},
		{
			value: 75,
			label: "75",
		},
		{
			value: 100,
			label: "100",
		},
	];

	const handlePlatformChange = (event) => {
		const {
			target: { value },
		} = event;
		// setPersonName(
		// 	// On autofill we get a stringified value.
		// 	typeof value === "string" ? value.split(",") : value
		// );
	};

	const [hypesTmpFilter, setHypesTmpFilter] = useState(1);
	const handleHypesChange = () => {
		if (typeof hypesTmpFilter === "number") setHypesFilter(hypesTmpFilter);
	};

	const handleHypesTmpChange = (event) => {
		setHypesTmpFilter(event.target.value === '' ? '' : Number(event.target.value));
	};

	return (
		<Grid container xs={12} marginTop={5} paddingBottom={0}>
			<Grid container xs={2}>
				{hypesFilter}
				<Slider
					value={hypesTmpFilter}
					aria-label="Hypes"
					defaultValue={1}
					step={1}
					valueLabelDisplay="auto"
					marks={hypeNScoreMarks}
					onChange={handleHypesTmpChange}
					onMouseUp={handleHypesChange}
				/>
			</Grid>
			{/* <Grid container xs={2}>
				<Slider
					aria-label="Rating"
					defaultValue={1}
					step={1}
					valueLabelDisplay="auto"
					marks={hypeNScoreMarks}
				/>
			</Grid> */}
			<Grid container xs={2}>
				<Select
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					multiple
					value={['PS5', 'XBOX', 'PC']}
					onChange={handlePlatformChange}
					input={
						<OutlinedInput id="select-multiple-chip" label="Chip" />
					}
					renderValue={(selected) => (
						<Box
							sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
						>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					// MenuProps={MenuProps}
				>
					{/* {names.map((name) => (
						<MenuItem
							key={name}
							value={name}
							style={getStyles(name, personName, theme)}
						>
							{name}
						</MenuItem>
					))} */}
				</Select>
			</Grid>
		</Grid>
	);
}

export default Filters;
