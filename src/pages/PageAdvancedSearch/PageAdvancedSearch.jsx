import React, { useState, useEffect } from "react";
import "./PageAdvancedSearch.scss";
import { useColorScheme } from "@mantine/hooks";
import { Accordion, Paper, Center, useMantineTheme } from "@mantine/core";

import FormSearch from "../../components/forms/FormSearch/FormSearch";
import CardList from "../../components/CardList/CardList";
import ChartApp from "../../components/charts/ChartApp";
import CardResults from "../../components/cards/CardResults/CardResults";
import Options from "../../utils/queryOptions.mjs";
import getDecisionDatesStats from "../../utils/decisionDatesStats.mjs";
import getConfidenceLevel from "../../utils/getConfidenceLevel.mjs";

const PageSearch = () => {
	const colorScheme = useColorScheme();
	const theme = useMantineTheme();

	const [isDataLoading, setIsDataLoading] = useState("");
	const [rawData, setRawData] = useState("");

	const [datasetAppType, setDatasetAppType] = useState("");
	const [datasetAppState, setDatasetAppState] = useState("");
	const [datasetAppSize, setDatasetAppSize] = useState("");
	const [requestSize, setRequestSize] = useState("");
	const [responseSize, setResponseSize] = useState("");

	const [durationData, setDurationData] = useState("");
	const [confidenceLevel, setConfidenceLevel] = useState("");

	useEffect(() => {
		rawData && processData();
	}, [rawData]);

	useEffect(() => {
		durationData && setConfidenceLevel(getConfidenceLevel(durationData));
	}, [durationData]);

	const processData = async () => {
		setResponseSize(rawData.length);
		console.log("💙 processing data");
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

			// setDatasetAppSize(
			// 	Options.appSize().map((label) => {
			// 		return rawData.filter((record) => {
			// 			return record.app_size === label;
			// 		});
			// 	})
			// );
		} catch (e) {
			console.log(e);
		}
		setDurationData(getDecisionDatesStats(rawData));
		setIsDataLoading(false);
	};

	const chartsArray = [
		{
			chartType: "bar",
			dataset: durationData,
			chartLabel: "Decision Duration/ Days",
			thresholdValueIndex: "",
			labels: Options.duration(),
		},
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
	];

	const confidenceLevelColor = {
		low: "red",
		medium: "orange",
		high: "green",
	};

	return (
		<>
			<FormSearch
				setRawData={setRawData}
				setIsDataLoading={setIsDataLoading}
				setResponseSize={setResponseSize}
				setRequestSize={setRequestSize}
			/>
			<CardResults
				confidenceLevel={confidenceLevel}
				requestSize={requestSize}
				responseSize={responseSize}
				confidenceLevelColor={confidenceLevelColor[confidenceLevel]}
				durationData={durationData}
			/>

			<section className="chart">
				<div className="chart__container">
					{chartsArray.map((chartProps) => {
						const { chartType, dataset, chartLabel, labels } = chartProps;
						return (
							<Paper
								key={chartLabel}
								style={{
									overflow: "auto",
									border:
										chartLabel === "Decision Duration/ Days" &&
										(confidenceLevel
											? `2px solid ${
													theme.colors[
														confidenceLevelColor[confidenceLevel]
													][9]
											  }`
											: ""),
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
					label={"Detailed List: " + responseSize + " Applications"}
				>
					{rawData && <CardList rawData={rawData} />}
				</Accordion.Item>
			</Accordion>
		</>
	);
};

export default PageSearch;
