import React, { useEffect } from "react";
import { useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";

// import dayjs from "dayjs";
import "./PageAdvancedSearch.scss";
import { Accordion, Paper, Center } from "@mantine/core";

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
	const [confidenceLevel, setConfidenceLevel] = useState("");

	useEffect(() => {
		rawData && processData();
	}, [rawData]);

	useEffect(() => {
		durationData && getConfidenceLevel();
	}, [durationData]);

	const getConfidenceLevel = () => {
		console.log("assessing confidence level");
		console.log(durationData);

		for (let index = 0; index < durationData.length; index++) {
			const element = durationData[index];
			if (element <= 0 || isNaN(element)) {
				setConfidenceLevel("low");
				return;
			}
		}

		if (durationData[0] > durationData[1]) {
			setConfidenceLevel("low");
			return;
		}

		if (
			durationData[0] >= durationData[1] &&
			durationData[1] <= durationData[2]
		) {
			setConfidenceLevel("medium");
			return;
		}

		if (
			durationData[0] <= durationData[1] &&
			durationData[1] >= durationData[2]
		) {
			setConfidenceLevel("medium");
			return;
		}

		if (
			durationData[0] <= durationData[1] &&
			durationData[1] <= durationData[2] &&
			durationData[2] <= durationData[3]
		) {
			setConfidenceLevel("high");
			return;
		}
	};

	const processData = async () => {
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

	const chartsArray = [
		{
			chartType: "bar",
			dataset: datasetAppState,
			chartLabel: "Application State",
			thresholdValueIndex: "",
			labels: Options.appState(),
		},
		{
			chartType: "bar",
			dataset: datasetAppSize,
			chartLabel: "Application Size",
			thresholdValueIndex: "",
			labels: Options.appSize(),
		},
		{
			chartType: "bar",
			dataset: datasetAppType,
			chartLabel: "Application Type",
			thresholdValueIndex: "",
			labels: Options.appType(),
		},
		{
			chartType: "bar",
			dataset: durationData,
			chartLabel: "Decision Duration/ Days",
			thresholdValueIndex: "",
			labels: Options.duration(),
		},
	];

	const confidenceLevelColor = {
		low: "244,102,102",
		medium: "229,131,38",
		high: "31,197,148",
	};

	return (
		<>
			<FormSearch
				setIsDataLoading={setIsDataLoading}
				setRawData={setRawData}
      />
			<section className="chart">
				<div className="chart__container">
					{chartsArray.map((chartProps) => {
						const { chartType, dataset, chartLabel, labels } = chartProps;
						return (
							<Paper
								key={chartLabel}
								style={{
									zIndex: "-1",
									overflow: "auto",
									border:
										chartLabel === "Decision Duration/ Days"
											? `3px solid rgb(${confidenceLevelColor[confidenceLevel]})`
											: "",
									backgroundColor:
										chartLabel === "Decision Duration/ Days"
											? `rgba(${confidenceLevelColor[confidenceLevel]},0.07)`
											: "",
								}}
								shadow="md"
								p="xs"
								m="sm"
								sx={{ margin: "0 auto" }}
								withBorder
							>
								<Center>
									<ChartApp
										chartType={chartType}
										dataset={dataset}
										chartLabel={chartLabel}
										labels={labels}
									/>
								</Center>
							</Paper>
						);
					})}
				</div>
			</section>
			<Accordion p="sm">
				<Accordion.Item
					styles={{
						content: { padding: 0 },
						contentInner: { padding: 0 },
					}}
					label="Detailed Applications List"
				>
					{rawData && <CardList rawData={rawData} />}
				</Accordion.Item>
			</Accordion>
		</>
	);
};

export default PageSearch;
