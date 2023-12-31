import React, { useRef } from "react";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// MUI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';

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
	height: '500px'
};

// Get gradiant color depending the pourcentage
function getColor(value) {
	//value from 0 to 1
	var hue = ((1 - value) * 120).toString(10);
	return ["hsl(", hue, ",80%,40%)"].join("");
}

function CircularProgressWithLabel(props) {
	return (
		<Box sx={{ position: "relative", display: "flex", cursor: "pointer" }} justifyContent="center">
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

	// Tabs
	const [tabValue, setTabValue] = React.useState('1');

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const carousel = useRef(null);
	const videoCarousel = useRef(null);
	const imgStyle = { width: '100%', cursor: 'pointer' }

	const img = [], videos = [];
	if(game) {
		img.push(
			<img
				style={imgStyle}
				alt={game.cover ? "https:" + game.cover.url : "/no-cover.png"}
				src={game.cover ? "https:" + game.cover.url : "/no-cover.png"}
				role="presentation"
			/>
		);
		if(game.artworks)
			game.artworks.map(artwork => {
				return img.push(
					<img
						key={artwork.id}
						style={imgStyle}
						alt={artwork.id}
						src={"https:" + artwork.url}
						role="presentation"
					/>);
			});

		if(game.videos) {
			game.videos.map(video => {
				return videos.push(
					<iframe
						title={video.video_id}
						width="100%"
						height="400px"
						src={`https://www.youtube.com/embed/${video.video_id}?mute=1`}
					></iframe>
				);
			})
		}
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<TabContext value={tabValue}>
					<TabList onChange={handleTabChange} aria-label="Game tabs" centered>
						<Tab label="Game" value="1" />
						<Tab label="Advanced" value="2" />
						<Tab label="Videos" value="3" />
					</TabList>
					{game ? (
						<>
							<TabPanel value="1">
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
										<Grid xs={12}>
											{game.name} - {game.date} - {game.platform.logo ?
												<>
													<Tooltip
														title={game.platform.slug}
													>
														<img
															style={{maxWidth: '50px', maxHeight: '30px', position:'absolute', marginLeft: '10px', marginTop: '-5px'}}
															alt={game.platform.slug}
															src={game.platform.logo ? "https:" + game.platform.logo : ""}
														/>
													</Tooltip>
												</>
												:
												<span>
													<br/>
													{game.platform.slug}
												</span>
											}
										</Grid>
										<Grid xs={4}>
											{game.aggregated_rating ? (
												<Tooltip
													title={`Rating based on ${game.aggregated_rating_count} external critic scores`}
												>
													<span>
														<CircularProgressWithLabel
															value={Math.round(game.aggregated_rating)}
														/>
													</span>
												</Tooltip>
											) : (
												<span>
													<br />
													<center>-</center>
												</span>
											)}
										</Grid>
										<Grid xs={4}>
											{game.rating ? (
												<Tooltip
													title={`Average IGDB user rating (${game.rating_count})`}
												>
													<span>
														<CircularProgressWithLabel
															value={Math.round(game.rating)}
														/>
													</span>
												</Tooltip>
											) : (
												<span>
													<br />
													<center>-</center>
												</span>
											)}
										</Grid>
										<Grid xs={4}>
											{game.total_rating ? (
												<Tooltip
													title={`Average rating based on both IGDB user and external critic scores (${game.total_rating_count})`}
												>
													<span>
														<CircularProgressWithLabel
															value={Math.round(game.total_rating)}
														/>
													</span>
												</Tooltip>
											) : (
												<span>
													<br />
													<center>-</center>
												</span>
											)}
											<br/>
										</Grid>
										<Grid xs={12} marginTop={-4} height={200} overflow='auto'>
											{game.summary}
										</Grid>
										<Grid xs={12} marginTop={-4}>
											<br />
											<br />
											<a href={game.url} target="blank">
												IGDB Page
											</a>
										</Grid>
									</Grid>
								</Grid>
							</TabPanel>
							<TabPanel value="2">
								<Grid container spacing={4}>
									<Grid xs={6} style={{maxHeight: '500px', overflow: 'auto'}}>
										<b>Category:</b><br />{game.category}
										<br /><br />
										{game.collection ?
											<>
											<b>Collection:</b><br />
											<Link href={game.collection.url} target="blank">{game.collection.name}</Link>
											<br /><br />
											</>
										: ''}
										{game.franchise ?
											<>
											<b>Franchise:</b><br />
											<Link href={game.franchise.url} target="blank">{game.franchise.name}</Link>
											<br /><br />
											</>
										: ''}
										{game.genres ?
											<>
											<b>Genres:</b><br />
											{game.genres.map(genre => {
												return (
													<Chip key={genre.name} style={{margin: '5px'}} label={genre.name} />
												)
											})}
											<br /><br />
											</>
										: ''}
										{game.game_modes ?
											<>
											<b>Game mode:</b><br />
											{game.game_modes.map(game_mode => {
												return (
													<Chip key={game_mode.name} style={{margin: '5px'}} label={game_mode.name} />
												)
											})}
											<br /><br />
											</>
										: ''}
										{game.dlcs ?
											<>
											<b>DLCs:</b><br />
											{game.dlcs.map(dlc => {
												return (
												<div key={dlc} >
													- <Link href={dlc.url} target="blank">{dlc.name}</Link><br />
												</div>
												)
											})}
											<br /><br />
											</>
										: ''}
									</Grid>
									<Grid xs={6}>
										<b>Status: {game.status}</b>
										<br /><br />
										<b>Hypes / Follows:</b> {game.hypes ? game.hypes : 0} / {game.follows ? game.follows : 0}
										<br /><br />
										{game.game_engines ?
											<>
											<b>Game engine:</b><br />
											{game.game_engines.map(engine => {
												return (
												<div key={engine} >
													<Link href={engine.url} target="blank">{engine.name}</Link>
												</div>
												)
											})}
											<br />
											</>
										: ''}
										{game.developer ?
											<>
											<b>Developer:</b><br />
											{game.developer.map(developer => {
												return (
													<Link key={developer.name} href={developer.url} target="blank">{developer.name}</Link>
												)
											})}
											<br /><br />
											</>
										: ''}
										{game.publisher ?
											<>
											<b>Publisher:</b><br />
											{game.publisher.map(publisher => {
												return (
													<Link key={publisher.name} href={publisher.url} target="blank">{publisher.name}</Link>
												)
											})}
											<br /><br />
											</>
										: ''}
									</Grid>
								</Grid>
							</TabPanel>
							<TabPanel value="3">
							<Grid container spacing={4}>
									<Grid xs={12} style={{ position: "relative" }}>
										<AliceCarousel
											key="videoCarousel"
											ref={videoCarousel}
											disableButtonsControls
											infinite
											items={videos}
										/>
										<div className="chevron" style={{ left: 0 }}>
											<ChevronLeftIcon
												sx={{ fontSize: 60 }}
												onClick={(e) =>
													videoCarousel?.current?.slidePrev(e)
												}
											/>
										</div>
										<div className="chevron" style={{ right: 0 }}>
											<ChevronRightIcon
												sx={{ fontSize: 60 }}
												onClick={(e) =>
													videoCarousel?.current?.slideNext(e)
												}
											/>
										</div>
									</Grid>
								</Grid>
							</TabPanel>
						</>
					) : (
						""
					)}
				</TabContext>
			</Box>
		</Modal>
	);
}

export default InfoModal;
