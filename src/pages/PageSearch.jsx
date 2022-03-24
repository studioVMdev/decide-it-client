import React, { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import FormSearch from "../components/forms/FormSearch";
import Chart from "chart.js/auto";
import Options from "../utils/queryOptions.mjs";

const PageSearch = () => {
	const [isDataLoading, setIsDataLoading] = useState(true);
	const [rawData, setRawData] = useState("");
	const [datasetAppState, setDatasetAppState] = useState("");
	const [requestSize, setRequestSize] = useState("");
	const [responseSize, setResponseSize] = useState("");
	const [registrationDuration, setRegistrationDuration] = useState("");
	const [decisionDuration, setDecisionDuration] = useState("");
	const [totalDuration, setTotalDuration] = useState("");
	const [decisionTarget, setDecisionTarget] = useState("");

	useEffect(() => {
		console.log("globalAppStateChart exists", globalAppStateChart);

		console.log("🥨 isDataLoading", isDataLoading);

		!isDataLoading && displayData();

		// console.log("isDataloading");
	}, [isDataLoading]);

	useEffect(() => {
		console.log("rawData set");

		rawData && analyseData();
	}, [rawData]);

	const analyseData = async () => {
		setResponseSize(rawData.length);
		console.log("setting raw data");
		console.log("💙 analysing data");

		try {
			const labels = Options.appState();
			const tempDatasetAppState = [];
			labels.forEach((label) => {
				let labelValueCount = rawData.filter((record) => {
					return record.app_state === label;
				});
				tempDatasetAppState.push(labelValueCount.length);
			});

			console.log(requestSize, rawData.length);
			setDatasetAppState(tempDatasetAppState);
			setRequestSize(requestSize);
			getDecisionDatesStats();

			console.log("❌ is loading to false ");
			setIsDataLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	const getDecisionDatesStats = () => {
		let decisionTarget, decisionDuration, totalDuration, registrationDuration;

		rawData.forEach((app) => {
			let date_received = dayjs(app.date_received);
			let date_validated = dayjs(app.date_validated);
			let target_decision_date = dayjs(app.target_decision_date);
			let decided_date = dayjs(app.decided_date);
			registrationDuration =
				date_validated.diff(date_received, "day") / rawData.length;
			// console.log("registration duration", registrationDuration);
			decisionTarget =
				target_decision_date.diff(date_validated, "day") / rawData.length;
			// console.log("decision target", decisionTarget);
			decisionDuration =
				decided_date.diff(date_validated, "day") / rawData.length;
			// console.log("decision duration", decisionDuration);
			totalDuration =
				decided_date.diff(date_received, "day") / rawData.length;
			// console.log("total app duration", totalDuration);
		});

		setDecisionDuration(decisionDuration);
		setDecisionTarget(decisionTarget);
		setTotalDuration(totalDuration);
		setRegistrationDuration(registrationDuration);
	};

	const chartOptions = {
		type: "bar",
		data: {
			labels: Options.appState(),
			datasets: [
				{
					label: `Retrieved ${responseSize} out of ${requestSize} requested applications`,
					data: datasetAppState,
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(153, 102, 255, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(153, 102, 255, 1)",
					],
					borderWidth: 1,
				},
			],
		},
		options: {
			aspectRatio: 2,
			scales: {
				y: {
					beginAtZero: true,
				},
			},
			plugins: {
				title: {
					display: true,
					text: "Custom Chart Title",
					position: "bottom",
					padding: {
						// top: 10,
						// bottom: 30,
					},
				},
				subtitle: {
					position: "bottom",
					display: true,
					text: "subtitle",
				},
			},
		},
	};

	let globalAppStateChart = null;

	const displayData = () => {
		console.log("💖 displaying data");

		//! CANVAS------------------
		const ctx = document.getElementById("chart-app-state").getContext("2d");

		console.log(myChart);

		if (globalAppStateChart) {
			globalAppStateChart.destroy();
			console.log("❌💔❌💔chart destroyed");
		}

		console.log(ctx);
		console.log("creating chart");
		const myChart = new Chart(ctx, chartOptions);
		//! CANVAS------------------
		globalAppStateChart = myChart;

		console.log(globalAppStateChart);
		console.log("✅ chart created and mounted");
	};

  const initialiseCharts = () => {
    
  }

	return (
		<>
			<FormSearch
				analyseData={analyseData}
				setIsDataLoading={setIsDataLoading}
				setRawData={setRawData}
			/>
			<div>
				<canvas id="chart-app-state" width="400" height="400"></canvas>
				<canvas id="chart-app-type" width="400" height="400"></canvas>
				<canvas id="chart-app-size" width="400" height="400"></canvas>
			</div>
		</>
	);
};

export default PageSearch;
