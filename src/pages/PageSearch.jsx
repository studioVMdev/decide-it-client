import React, { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import FormSearch from "../components/forms/FormSearch";
// import Chart from "chart.js/auto";
import Options from "../utils/queryOptions.mjs";

import ChartApp from "../components/charts/ChartApp";

const PageSearch = (props) => {
	// console.log(props)
	const [isDataLoading, setIsDataLoading] = useState("");
	const [rawData, setRawData] = useState("");
	const [datasetAppType, setDatasetAppType] = useState("");
	const [datasetAppState, setDatasetAppState] = useState("");
	const [datasetAppSize, setDatasetAppSize] = useState("");
	const [responseSize, setResponseSize] = useState("");

	const [registrationDuration, setRegistrationDuration] = useState("");
	const [decisionTarget, setDecisionTarget] = useState("");
	const [decisionDuration, setDecisionDuration] = useState("");
	const [totalDuration, setTotalDuration] = useState("");

	useEffect(() => {
		console.log("rawData effect");
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
				console.log(label);
				let labelValueCount = rawData.filter((record) => {
					return record.app_size === label;
				});
				tempDatasetAppSize.push(labelValueCount.length);
			});
			setDatasetAppSize(tempDatasetAppSize);
			console.log(labels, tempDatasetAppSize);
		} catch (e) {
			console.log(e);
		}

		getDecisionDatesStats();

		console.log("❌ is loading to false ");
		setIsDataLoading(false);
	};

	const getDecisionDatesStats = () => {
		let registrationDuration = null;
		let decisionTarget = null;
		let decisionDuration = null;
		let totalDuration = null;

		rawData.forEach((app) => {
			let date_received = dayjs(app.date_received);
			let date_validated = dayjs(app.date_validated);
			let target_decision_date = dayjs(app.target_decision_date);
			let decided_date = dayjs(app.decided_date);

			registrationDuration +=
				date_validated.diff(date_received, "day") / rawData.length || 0;

			// console.log("reg dur", registrationDuration)

			decisionTarget +=
				target_decision_date.diff(date_validated, "day") / rawData.length ||
				0;
			// console.log("target dur", decisionTarget)

			decisionDuration +=
				decided_date.diff(date_validated, "day") / rawData.length || 0;
			// console.log("decision dur", decisionDuration)

			totalDuration +=
				decided_date.diff(date_received, "day") / rawData.length || 0;
			// console.log("total dur", totalDuration)
		});

		console.log("reg dur", registrationDuration);
		console.log("target dur", decisionTarget);
		console.log("decision dur", decisionDuration);
		console.log("total dur", totalDuration);

		setDecisionDuration(decisionDuration);
		setDecisionTarget(decisionTarget);
		setTotalDuration(totalDuration);
		setRegistrationDuration(registrationDuration);
	};

	return (
		<>
			<FormSearch
				analyseData={analyseData}
				setIsDataLoading={setIsDataLoading}
				setRawData={setRawData}
			/>
			<div>
				<div className="total"></div>
				{
					<>
						<ChartApp
							chartType="bar"
							dataset={datasetAppState}
							chartLabel="Application State"
							labels={Options.appState()}
						/>

						<ChartApp
							chartType="line"
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
							chartType="line"
							chartLabel="Application Duration"
							dataset={[
								registrationDuration,
								decisionTarget,
								decisionDuration,
								totalDuration,
							]}
							labels={Options.duration()}
						/>
					</>
				}
			</div>
		</>
	);
};

export default PageSearch;
