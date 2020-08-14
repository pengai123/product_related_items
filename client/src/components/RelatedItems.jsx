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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Modal from '@material-ui/core/Modal';

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
	fullHeightCard: {
		height: "100%",
	},
	paper: {
		position: 'absolute',
		width: 600,
		backgroundColor: "white",
		//border: '1px solid #000',
		border: '1px solid',
		//boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},

}));

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

function RelatedItems(props) {


	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const [comparedItem, setComparedItem] = React.useState({ features: [{}] });
	// const [combinedFeatures, setCombinedFeatures] = React.useState([]);
	const [comparisonData, setComparisonData] = React.useState({
		combinedFeatures: [],
		currentValues: [],
		comparedValues: []
	});

	const handleOpen = (itemObj) => {
		setComparedItem(itemObj);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const classes = useStyles();

	var relatedItems = props.relatedItems;
	var currentItem = props.currentItem;

	useEffect(() => {
		var _combinedFeatures = [];
		var _currentValues = [];
		var _comparedValues = [];
		for (var i = 0; i < currentItem.features.length; i++) {
			if (_combinedFeatures.indexOf(currentItem.features[i].feature) === -1) {
				_combinedFeatures.push(currentItem.features[i].feature);
			}
		}

		for (var j = 0; j < comparedItem.features.length; j++) {
			if (_combinedFeatures.indexOf(comparedItem.features[j].feature) === -1) {
				_combinedFeatures.push(comparedItem.features[j].feature);
			}
		}

		for (var k = 0; k < _combinedFeatures.length; k++) {
			var flagCurrent = false;
			var flagCompared = false;

			for (var i = 0; i < currentItem.features.length; i++) {
				if (currentItem.features[i].feature === _combinedFeatures[k]) {
					flagCurrent = true;
					_currentValues.push(currentItem.features[i].value)
				}
			}

			for (var j = 0; j < comparedItem.features.length; j++) {
				if (comparedItem.features[j].feature === _combinedFeatures[k]) {
					flagCompared = true;
					_comparedValues.push(comparedItem.features[j].value)
				}
			}

			if (!flagCurrent) { _currentValues.push("N/A") }
			if (!flagCompared) { _comparedValues.push("N/A") }
		}

		//setCombinedFeatures(mergedFeatures);
		setComparisonData({
			...comparisonData,
			combinedFeatures: _combinedFeatures,
			currentValues: _currentValues,
			comparedValues: _comparedValues
		})
		return () => {
			setComparisonData({
				combinedFeatures: [],
				currentValues: [],
				comparedValues: []
			});
		}
	}, [comparedItem, currentItem])


	var modalBody = (
		<Grid container style={modalStyle} className={classes.paper}>

			<Grid item container justify="center" xs={12}>
				<Typography variant="h6">COMPARING</Typography>
			</Grid>

			<Grid item container justify="space-between" container xs={12}>
				<Typography variant="subtitle2">
					{currentItem.name}
				</Typography>
				<Typography variant="subtitle2">
					{comparedItem.name}
				</Typography>
			</Grid>

			<Grid item container direction="column" alignItems="flex-start" xs={4}>
				{comparisonData.currentValues.map((value, idx) => (
					<Typography key={idx} variant="subtitle2" color="textSecondary">
						{value}
					</Typography>
				)
				)}
			</Grid>
			<Grid item container direction="column" alignItems="center" xs={4}>
				{comparisonData.combinedFeatures.map((feature, idx) => (
					<Typography key={idx} variant="subtitle2" color="textSecondary">
						{feature}
					</Typography>
				)
				)}
			</Grid>
			<Grid item container direction="column" alignItems="flex-end" xs={4}>
				{comparisonData.comparedValues.map((value, idx) => (
					<Typography key={idx} variant="subtitle2" color="textSecondary">
						{value}
					</Typography>
				)
				)}
			</Grid>
		</Grid>
	)

	var updateOutfitItems = function (itemObj, e) {
		var checked = e.target.checked;
		console.log('checked from relatedItems:', checked)
		console.log('itemObj from relatedItems:', itemObj)
		props.updateOutfitItems(itemObj, checked)
	}

	// style={{ border: "solid 1px" }}
	return (
		<div>
			<Typography variant="subtitle1" color="textPrimary" component="p">
				RELATED PRODUCTS
			</Typography>
			<Grid container>
				<Grid item style={{ overflow: 'auto' }} >
					<List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
						{relatedItems.map((item, idx) => {
							return (
								<ListItem key={idx} >
									<Card className={classes.fullHeightCard} >
										<CardHeader
											action={
												<FormControlLabel onChange={updateOutfitItems.bind(null, item)}
													control={<Checkbox icon={<StarBorderIcon />} checkedIcon={<StarIcon />} name="checkedH" />}
												/>
												// <IconButton aria-label="settings">
												// 	<StarBorderIcon />
												// </IconButton>
											}
										/>
										{item.results[0].photos[0].url ? (
											<CardMedia
												className={classes.media}
												image={item.results[0].photos[0].url}
												onClick={handleOpen.bind(null, item)}
											//title={item.name}
											/>
										) : (<CardMedia
											className={classes.media}
											image={`https://i5.walmartimages.com/asr/e7288ae9-bc36-4614-9b7d-7e1ff2d706fa_1.3aef7bb9143e505cdc178dc561ba0d69.jpeg`}
											onClick={handleOpen.bind(null, item)}
										//title={item.name}
										/>)}
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
						})}
					</List>
				</Grid>
			</Grid>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="product comparison"
				aria-describedby="product features comparison"
			>
				{modalBody}
			</Modal>
		</div>
	);
}

export default RelatedItems;