import React, { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import "./PageAdvancedSearch.scss";

import FormSearch from "../../components/forms/FormSearch/FormSearch";
import Options from "../../utils/queryOptions.mjs";
import ChartApp from "../../components/charts/ChartApp";
import getDecisionDatesStats from "../../utils/decisionDatesStats.mjs";
import CardList from "../../components/CardList/CardList";

const PageSearch = (props) => {
	// console.log(props)
	const [isDataLoading, setIsDataLoading] = useState("");
	const [rawData, setRawData] = useState("");
	const [datasetAppType, setDatasetAppType] = useState("");
	const [datasetAppState, setDatasetAppState] = useState("");
	const [datasetAppSize, setDatasetAppSize] = useState("");
	const [responseSize, setResponseSize] = useState("");

	const [durationData, setDurationData] = useState("");

	useEffect(() => {
		rawData && analyseData();
	}, [rawData]);

	const analyseData = async () => {
		setResponseSize(rawData.length);
		console.log("setting raw data");
		console.log("💙 analyzing data");

		try {
			const labels = Options.appType();
			const tempDatasetAppType = [];
			labels.forEach((label) => {
				let labelValueCount = rawData.filter((record) => {
					return record.app_type === label;
				});
				tempDatasetAppType.push(labelValueCount.length);
			});
			setDatasetAppType(tempDatasetAppType);
		} catch (e) {
			console.log(e);
		}

		try {
			const labels = Options.appState();
			const tempDatasetAppState = [];
			labels.forEach((label) => {
				let labelValueCount = rawData.filter((record) => {
					return record.app_state === label;
				});
				tempDatasetAppState.push(labelValueCount.length);
			});
			setDatasetAppState(tempDatasetAppState);
		} catch (e) {
			console.log(e);
		}

		try {
			const labels = Options.appSize();
			const tempDatasetAppSize = [];

			labels.forEach((label) => {
				let labelValueCount = rawData.filter((record) => {
					return record.app_size === label;
				});
				tempDatasetAppSize.push(labelValueCount.length);
			});
			setDatasetAppSize(tempDatasetAppSize);
		} catch (e) {
			console.log(e);
		}

		setDurationData(getDecisionDatesStats(rawData));

		console.log("❌ is loading to false ");
		setIsDataLoading(false);
	};

	return (
		<>
			<FormSearch
				setIsDataLoading={setIsDataLoading}
				setRawData={setRawData}
			/>
			<section className="chart">
				<div className="chart__container">
					<ChartApp
						chartType="bar"
						dataset={datasetAppState}
						chartLabel="Application State"
						labels={Options.appState()}
					/>

					<ChartApp
						chartType="bar"
						dataset={datasetAppSize}
						chartLabel="Application Size"
						labels={Options.appSize()}
					/>

					<ChartApp
						chartType="bar"
						dataset={datasetAppType}
						chartLabel="Application Type"
						labels={Options.appType()}
					/>
					<ChartApp
						chartType="bar"
						thresholdValueIndex="1"
						chartLabel="Application Duration"
						dataset={durationData}
						labels={Options.duration()}
					/>
				</div>
			</section>
			<section>{rawData && <CardList rawData={rawData} />}</section>
		</>
	);
};

export default PageSearch;
