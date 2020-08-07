import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Rating from '@material-ui/lab/Rating';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
		height: 0,
		paddingTop: '56.25%', // 16:9
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
	fullHeightCard: {
		height: "100%",
	}

}));

function RelatedItems(props) {
	// {
	// 	relatedItems: [],
	// 	startingIndex: 0,
	// 	prePageIcon: false,
	// 	nextPageIcon: true
	// }
	const classes = useStyles();
	var showningItems = props.relatedItemsState.relatedItems.slice(props.relatedItemsState.startingIndex, props.relatedItemsState.startingIndex + 3)

	var prePageClick = function (e) {
		props.changeStartingIndex(-3)

	}

	var nextPageClick = function (e) {
		props.changeStartingIndex(3)
	}
	// style={{ border: "solid 1px" }}
	return (
		<div>
			<Typography variant="subtitle1" color="textPrimary" component="p">
				RELATED PRODUCTS
			</Typography>
			<Grid container justify="center" spacing={2}>
				<Grid item container alignItems="center" xs={1}>
					<IconButton style={{ display: props.relatedItemsState.prePageIcon ? 'block' : 'none' }} aria-label="settings" onClick={prePageClick} >
						<NavigateBeforeIcon />
					</IconButton>
				</Grid>
				{showningItems.map((item, idx) => {
					return (
						<Grid item key={idx} xs={3}>
							<Card className={classes.fullHeightCard}>
								<CardHeader
									action={
										<FormControlLabel
											control={<Checkbox icon={<StarBorderIcon />} checkedIcon={<StarIcon />} name="checkedH" />}
										/>}
								/>
								{/* <IconButton aria-label="settings">
										 	<StarBorderIcon />
										 </IconButton> */}
								<CardMedia
									className={classes.media}
									image="https://vader-prod.s3.amazonaws.com/1571854823-nike-legend-react-mens-2288-1533739703.jpg"
									title={item.name}
								/>
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
									<Rating name="half-rating-read" defaultValue={4.5} precision={0.5} size="small" readOnly />
								</CardContent>
							</Card>
						</Grid>
					)
				})}
				<Grid item container alignItems="center" xs={1}>
					<IconButton style={{ display: props.relatedItemsState.nextPageIcon ? 'block' : 'none' }} aria-label="settings" onClick={nextPageClick}>
						<NavigateNextIcon />
					</IconButton>
				</Grid>
			</Grid>

		</div>
	);
}

export default RelatedItems;