import React, { useRef } from "react";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Paper from "@mui/material/Paper";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'animate.css/animate.css'

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: 0,
	textAlign: "center",
	color: theme.palette.text.secondary,
	width: '100%',
	height: '300px',
	backgroundImage: null,
	overflow: 'hidden'
}));

function Day({ day, handleOpen, setModalGame, isToday, games }) {

	const carousel = useRef(null);
	const items = [], imgStyle = { width: '100%', height: '280px', cursor: 'pointer' };
	games.map(game => {
		return items.push(
			<div>
				<img
					style={imgStyle}
					alt={game.name}
					src={game.cover ? "http:" + game.cover.url : "/no-cover.png"}
					role="presentation"
					onClick={() => {
						setModalGame(game);
						handleOpen();
					}}
				/>
				{games.length > 1 ? (
					<>
						<div className="chevron" style={{left: 0}}>
							<ChevronLeftIcon sx={{ fontSize: 60 }} onClick={(e) => carousel?.current?.slidePrev(e)}/>
						</div>
						<div className="chevron" style={{right: 0}}>
							<ChevronRightIcon sx={{ fontSize: 60 }} onClick={(e) => carousel?.current?.slideNext(e)}/>
						</div>
					</>
				) : ''}
			</div>
		);
	});

	return (
		<Grid
			xs={6}
			sm={4}
			md={3}
			lg={1.5}
			className={games[0] ?
				'animate__animated animate__fadeIn animate__faster onHoverZoom' :
				'animate__animated animate__fadeIn animate__faster'
			}
		>
			{games[0] ? (
				<Item className={isToday() ? 'gradient-border' : null}>
					<b>{day}</b>
					<br />
					<AliceCarousel
						key="carousel"
						ref={carousel}
						disableButtonsControls
						autoHeight
						infinite
						items={items}
					/>
				</Item>
			) : (
				<Item className={isToday() ? 'gradient-border' : null}>
					<b>{day}</b>
					<br />
				</Item>
			)}
		</Grid>
	);
}

export default Day;
