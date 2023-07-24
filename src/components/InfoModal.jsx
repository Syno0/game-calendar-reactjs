import React, { useRef } from "react";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 800,
	bgcolor: "background.paper",
	border: "1px solid #FFF",
	borderRadius: '5px',
	boxShadow: 24,
	p: 4,
};

// Get gradiant color depending the pourcentage
function getColor(value) {
	//value from 0 to 1
	var hue = ((1 - value) * 120).toString(10);
	return ["hsl(", hue, ",100%,50%)"].join("");
}

function CircularProgressWithLabel(props) {
	return (
		<Box sx={{ position: "relative", display: "flex" }} justifyContent="center">
			<CircularProgress size="75px" variant="determinate" style={{color: getColor(100 - props.value/100)}} {...props} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography variant="caption" component="div" color="text.secondary">
					{`${Math.round(props.value)}%`}
				</Typography>
			</Box>
		</Box>
	);
}

function InfoModal({open, handleClose, game}) {

	console.log(game ? game : null);
	const carousel = useRef(null);
	const imgStyle = { width: '100%', cursor: 'pointer' }

	const img = [];
	if(game) {
		img.push(
			<img
				style={imgStyle}
				alt={game.cover.url}
				src={"http:" + game.cover.url}
				role="presentation"
			/>
		);
		game.artworks.map(artwork => {
			return img.push(
				<img
					style={imgStyle}
					alt={artwork.id}
					src={"http:" + artwork.url}
					role="presentation"
				/>);
		});
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				{game ? (
					<Grid container spacing={4}>
						<Grid xs={5} style={{ position: "relative" }}>
							<AliceCarousel
								key="carousel"
								ref={carousel}
								disableButtonsControls
								infinite
								items={img}
							/>
							<div className="chevron" style={{ left: 0 }}>
								<ChevronLeftIcon
									sx={{ fontSize: 60 }}
									onClick={(e) =>
										carousel?.current?.slidePrev(e)
									}
								/>
							</div>
							<div className="chevron" style={{ right: 0 }}>
								<ChevronRightIcon
									sx={{ fontSize: 60 }}
									onClick={(e) =>
										carousel?.current?.slideNext(e)
									}
								/>
							</div>
						</Grid>
						<Grid xs={7} container>
							<Grid xs={12} gridTemplateColumns={1}>
								{game.name}
							</Grid>
							<Grid xs={4}>
								<CircularProgressWithLabel value={Math.round(game.aggregated_rating)} />
							</Grid>
							<Grid xs={4}>
								<CircularProgressWithLabel value={Math.round(game.rating)} />
							</Grid>
							<Grid xs={4}>
								<CircularProgressWithLabel value={Math.round(game.total_rating)} />
							</Grid>
						</Grid>
					</Grid>
				) : (
					""
				)}
			</Box>
		</Modal>
	);
}

export default InfoModal;
