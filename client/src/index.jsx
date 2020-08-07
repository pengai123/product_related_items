import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import SearchAppBar from './components/SearchAppBar.jsx'
import RelatedItems from './components/RelatedItems.jsx'
import QA from './components/QA.jsx'
import Grid from '@material-ui/core/Grid';


function App() {

	const [relatedItemsState, setRelatedItemsState] = useState({
		relatedItems: [],
		startingIndex: 0,
		prePageIcon: true,
		nextPageIcon: true
	})

	useEffect(() => {
		axios.get("/relatedItems/1")
			.then(result => {
				//console.log('result:', result.data)
				setRelatedItemsState({ ...relatedItemsState, relatedItems: result.data, startingIndex: 0 })
			})
	}, []);

	var changeStartingIndex = function (val) {
		if (relatedItemsState.startingIndex + val >= 0 && relatedItemsState.startingIndex + val < relatedItemsState.relatedItems.length) {
			setRelatedItemsState({ ...relatedItemsState, startingIndex: relatedItemsState.startingIndex + val });
		}
	}

	return (
		<Grid container direction="column">
			<Grid item >
				<SearchAppBar />
			</Grid>
			<Grid item container>
				<Grid item xs={1} />
				<Grid item xs={10}>
					<RelatedItems changeStartingIndex={changeStartingIndex} relatedItemsState={relatedItemsState} />
				</Grid>
				<Grid item xs={1} />
			</Grid>
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