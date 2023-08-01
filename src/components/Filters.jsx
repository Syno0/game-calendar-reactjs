import React, { useState, useEffect } from "react";
import { useGetPlatforms } from "../helpers/igdb_api";

// MUI
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Chip from "@mui/material/Chip";
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

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

const defaultPlatform = ["win", "switch", "ps5", "series-x"];

let allPlatforms;

function Filters({setHypesFilter, setScoreFilter, platformFilter, setPlatformFilter}) {

	// Platforms
	let { data, isFetching, isError } = useGetPlatforms();

	useEffect(() => {
		if(!data)
			return;
		allPlatforms = data;
		setPlatformFilter(data.filter(x => defaultPlatform.includes(x.slug)));
	}, [data, setPlatformFilter]);

	const handlePlatformChange = (event) => {
		const values = event.target.value;
		setPlatformFilter(allPlatforms.filter(x => values.includes(x.name)));
	};

	const handlePlatformDelete = (platform) => {
		setPlatformFilter(platformFilter.filter(x => x.name !== platform));
	};

	// Hypes
	const [hypesTmpFilter, setHypesTmpFilter] = useState(1);
	const handleHypesChange = () => {
		if (typeof hypesTmpFilter === "number") setHypesFilter(hypesTmpFilter);
	};

	const handleHypesTmpChange = (event) => {
		setHypesTmpFilter(event.target.value === '' ? '' : Number(event.target.value));
	};

	// Score
	const handleScoreChange = (event) => {
		setScoreFilter(event.target.checked);
	};

	return (
		<Grid container xs={12} marginTop={0} paddingBottom={0}>
			<Grid xs={12} sm={6} md={3} padding={5}>
				Hypes:
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
			<Grid xs={12} sm={6} md={1} padding={5}>
				Score:
				<br />
				<Checkbox onChange={handleScoreChange} />
			</Grid>
			<Grid xs={12} sm={12} md={4} padding={5}>
				Platform:
				<br />
				<Select
					labelId="multiple-platform-label"
					id="multiple-platform-label"
					multiple
					style={{ minWidth: "100%" }}
					value={platformFilter.map((x) => x.name)}
					onChange={handlePlatformChange}
					renderValue={(selected) => (
						<Box
							sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
						>
							{selected.map((platform) => (
								<Chip
									key={platform}
									label={platform}
									onDelete={() =>
										handlePlatformDelete(platform)
									}
									deleteIcon={
										<CancelIcon
											onMouseDown={(event) =>
												// Avoid opening select list on delete btn click
												event.stopPropagation()
											}
										/>
									}
								/>
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{isFetching ? (
						<Box style={{ margin: "auto" }} sx={{ width: "50%" }}>
							LOADING...
						</Box>
					) : !data || typeof data === "undefined" || isError ? (
						<div xs={12} style={{ margin: "auto" }}>
							Sorry, an error occured :(
						</div>
					) : (
						data
							.sort((a, b) => {
								if (a.name < b.name) return -1;
								if (a.name > b.name) return 1;
								return 0;
							})
							.map((platform) => (
								<MenuItem
									key={platform.slug}
									value={platform.name}
								>
									{platform.name}
								</MenuItem>
							))
					)}
				</Select>
			</Grid>
			<Grid xs={12} sm={12} md={3} padding={5}>
				<Button
					variant="outlined"
					startIcon={<RefreshIcon />}
				>
					Reset filters
				</Button>
			</Grid>
		</Grid>
	);
}

export default Filters;
