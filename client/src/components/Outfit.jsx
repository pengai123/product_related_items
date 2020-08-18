import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		// display: 'flex',
		// flexDirection: 'column',
		// '& > * + *': {
		//   marginTop: theme.spacing(1),
		// }
	},
	media: {
		//height: 150
		//paddingTop: '56.25%' // 16:9
		paddingTop: '60%' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	gridListRoot: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		//backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
		width: 180
	}
}));

export default function Outfit(props) {

	const classes = useStyles();
	var outfitItems = props.outfitItems;

	var updateOutfitItems = function (itemObj, e) {

		console.log('itemObj from Outfit:', itemObj)
		props.updateOutfitItems(itemObj, false)
	}

	// style={{ border: "solid 1px" }}
	return (
		<div>
			<Typography variant="subtitle1" color="textPrimary" component="p">
				YOUR OUTFIT
			</Typography>
			<Grid container>
				<Grid item style={{ overflow: 'auto' }} >
					<List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
						{outfitItems.length > 0 ? outfitItems.map((item, idx) => {
							return (
								// <Grid item  xs={3}>
								<ListItem key={idx}>
									<Card style={{ height: "100%" }} >
										<CardHeader
											action={
												<IconButton onClick={updateOutfitItems.bind(null, item)} aria-label="settings">
													<HighlightOffIcon />
												</IconButton>
											}
										/>
										<CardMedia className={classes.gridListRoot} >
											<GridList className={classes.gridList} cols={1}>
												{item.results.map((style, idx) => {
													if (style.photos[0].url) {
														return (
															<GridListTile key={idx}>
																<img src={style.photos[0].url} />
															</GridListTile>
														)
													} else {
														return (
															<GridListTile key={idx}>
																<img src={`https://i5.walmartimages.com/asr/e7288ae9-bc36-4614-9b7d-7e1ff2d706fa_1.3aef7bb9143e505cdc178dc561ba0d69.jpeg`} />
															</GridListTile>
														)
													}
												})}
											</GridList>
										</CardMedia>
										<CardContent>
											<Typography variant="caption" color="textSecondary" component="p">
												{item.category}
											</Typography>
											<Typography variant="caption" color="textPrimary" component="p">
												{item.name}
											</Typography>
											<Typography variant="caption" color="textSecondary" component="p">
												${item.default_price}
											</Typography>
											<Rating name="half-rating-read" value={item.aveRating} precision={0.5} size="small" readOnly />
										</CardContent>
									</Card>
								</ListItem>
							)
						}) :
							(<Grid container justify="center" >
								<Typography variant="subtitle2" color="secondary" component="p">
									You have not picked any item, go ahead to pick some to build your outfit...
								</Typography>
							</Grid>)
						}
					</List>
				</Grid>
			</Grid>
		</div>
	);
}


