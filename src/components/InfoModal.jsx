import React from "react";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function InfoModal({open, handleClose, game}) {

	console.log(game ? game : null);

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
				{game ?
				<Grid container spacing={4}>
					<Grid xs={4}>
						<AliceCarousel
							key="carousel"
							disableButtonsControls
							autoHeight
							infinite
							items={img}
						/>
					</Grid>
					<Grid xs={8}>
						{game.name}
					</Grid>
				</Grid>
				: ""}
			</Box>
		</Modal>
	);
}

export default InfoModal;
