import React from "react";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Paper from "@mui/material/Paper";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: 0,
	textAlign: "center",
	color: theme.palette.text.secondary,
	width: '100%',
	height: '100%',
	minHeight: '300px',
	backgroundImage: null
}));

function Day({ day, games }) {

	const items = [], imgStyle = { width: '100%', height: '260px' };
	games.map(game => {
		return items.push(
			<div>{game.name}
				<img
					style={imgStyle}
					alt={game.name}
					src={game.cover ? "http:" + game.cover.url : ""}
					role="presentation"
				/>
				<div style={{left: 0, position: 'absolute', width: '40px', top: '40%', color: '#FFF'}}>
					<ChevronLeftIcon sx={{ fontSize: 60 }}/>
				</div>
				<div style={{right: 0, position: 'absolute', width: '40px', top: '40%', color: '#FFF'}}>
					<ChevronRightIcon sx={{ fontSize: 60 }}/>
				</div>
			</div>
		);
	})

	// const Carousel = () => (
	// 	<AliceCarousel autoHeight infinite mouseTracking items={items} />
	// );

	return (
		<Grid xs={12} sm={6} md={4} lg={2}>
			{games[0] ? (
				<Item>
					<b>{day}</b>
					<br />
					<AliceCarousel
						disableButtonsControls
						disableDotsControls
						autoHeight
						infinite
						items={items}
					/>
				</Item>
			) : (
				<Item>
					{day}
					<br />
				</Item>
			)}
		</Grid>
	);
}

export default Day;
