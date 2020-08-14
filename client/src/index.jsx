import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import SearchAppBar from './components/SearchAppBar.jsx'
import RelatedItems from './components/RelatedItems.jsx'
import Outfit from './components/Outfit.jsx'
import QA from './components/QA.jsx'
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

function App() {

	const [state, setState] = useState({
		relatedItems: [],
		outfitItems: [],
		currentItem: {features: [{feature: 'feature', value: 'value'}]}
	})

	function reatingCaculator(ratingObj) {
		var ratingScore = 0;
		var ratingNumber = 0

		for (var key in ratingObj) {
			ratingScore = ratingScore + (Number(key) * ratingObj[key]);
			ratingNumber += ratingObj[key];
		}

		var result = ratingScore / ratingNumber;
		return result;
	}

	function getItemData(id, cb) {

		var getProduct = axios.get(`/products/${id}`)
		var getStyle = axios.get(`/styles/${id}`)
		var getReview = axios.get(`/reviews/${id}`)
		//[productData, styleData, reviewData]
		Promise.all([getProduct, getStyle, getReview])
			.then(([productData, styleData, reviewData]) => {

				var aveRating = reatingCaculator(reviewData.data.ratings)
				var itemInfo = Object.assign(productData.data, styleData.data, reviewData.data, { aveRating: aveRating })
				cb(null, itemInfo)
			})
	}

	function setRelatedItemsData(id) {
		var relatedItemsInfo = [];
		var relatedItemsId = [];

		axios.get(`/relatedItems/${id}`)
			.then(result => {
				console.log('relatedItems result:', result.data)
				relatedItemsId = result.data;
				// setState({ ...state, relatedItems: result.data, startingIndex: 0 })
				for (var i = 0; i < result.data.length; i++) {
					var getProduct = axios.get(`/products/${result.data[i]}`)
					var getStyle = axios.get(`/styles/${result.data[i]}`)
					var getReview = axios.get(`/reviews/${result.data[i]}`)
					//[productData, styleData, reviewData]
					Promise.all([getProduct, getStyle, getReview])
						.then(([productData, styleData, reviewData]) => {

							var aveRating = reatingCaculator(reviewData.data.ratings)
							var itemInfo = Object.assign(productData.data, styleData.data, reviewData.data, { aveRating: aveRating })
							relatedItemsInfo.push(itemInfo)
							if (relatedItemsInfo.length === relatedItemsId.length) {
								console.log("relatedItemsInfo: ", relatedItemsInfo);
								getItemData(id, (err, itemObj) => {
									setState({
										...state,
										relatedItems: relatedItemsInfo,
										currentItem: itemObj
									})
								})
							}
						})
				}
			})

		

	}

	useEffect(() => {

		setRelatedItemsData(7);

	}, []);

	var updateOutfitItems = function (itemObj, isOutfitItem) {
		console.log('isOutfitItem from index:', isOutfitItem)
		console.log('itemObj from index :', itemObj)

		let outfitArr = state.outfitItems;
		console.log('outfitArr before:', outfitArr)
		if (isOutfitItem) {
			outfitArr.push(itemObj);
		} else {
			for (var i = 0; i < outfitArr.length; i++) {
				if (JSON.stringify(outfitArr[i]) === JSON.stringify(itemObj)) {
					outfitArr.splice(i, 1);
				}
			}
		}
		console.log('outfitArr atfer:', outfitArr)
		setState({ ...state, outfitItems: outfitArr });
	}

	return (
		<Grid container direction="column">
			<Grid item >
				<SearchAppBar />
			</Grid>
			<Grid item container>
				<Grid item xs={1} />
				<Grid item xs={10}>
					<RelatedItems
						// changeStartingIndex={changeStartingIndex}
						currentItem={state.currentItem} 
						relatedItems={state.relatedItems}
						updateOutfitItems={updateOutfitItems}
					/>
				</Grid>
				<Grid item xs={1} />
			</Grid>
			<br /><br />
			<Grid item container>
				<Grid item xs={1} />
				<Grid item xs={10}>
					<Outfit
						outfitItems={state.outfitItems}
						updateOutfitItems={updateOutfitItems}
					/>
				</Grid>
				<Grid item xs={1} />
			</Grid>
			<br /><br />
			<Grid item container>
				<Grid item xs={1} />
				<Grid item xs={10}>
					<QA />
				</Grid>
				<Grid item xs={1} />
			</Grid>
		</Grid>
	)
}

ReactDom.render(<App />, document.getElementById("app"));