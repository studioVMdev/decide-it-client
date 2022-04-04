import React from "react";
import "./PageSimpleSearch.scss";
import Options from "../../utils/queryOptions.mjs";
import getDecisionDatesStats from "../../utils/decisionDatesStats.mjs";
import dayjs from "dayjs";
import { useNotifications } from "@mantine/notifications";
import { Accordion } from "@mantine/core";
import ChartApp from "../../components/charts/ChartApp";
import CardResults from "../../components/cards/CardResults/CardResults";
import CardList from "../../components/CardList/CardList";

import { GET_SIMPLE_SEARCH } from "../../utils/apiCalls.mjs";
import getConfidenceLevel from "../../utils/getConfidenceLevel.mjs";

import { useState, useEffect } from "react";
import {
	Stepper,
	Button,
	Box,
	Container,
	Group,
	SimpleGrid,
	InputWrapper,
	TextInput,
	NumberInput,
	Select,
	Text,
	Paper,
	useMantineTheme,
} from "@mantine/core";

const PageSimpleSearch = () => {
	const theme = useMantineTheme();

	const notifications = useNotifications();

	const [active, setActive] = useState(0);
	const nextStep = () =>
		setActive((current) => (current < 3 ? current + 1 : current));
	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	const [isDataLoading, setIsDataLoading] = useState(true);
	const [rawData, setRawData] = useState("");
	const [responseSize, setResponseSize] = useState("");
	const [durationData, setDurationData] = useState("");

	const [postCode, setPostCode] = useState("");
	// const [isValidPostcode, setIsValidPostcode] = useState(true);
	const [radius, setRadius] = useState(3);
	const [appSize, setAppSize] = useState("");
	const [appType, setAppType] = useState("");
	const [requestSize, setRequestSize] = useState(50);
	//! This start date is always 12 months in the past
	const [startDate, setStartDate] = useState(
		dayjs(dayjs().subtract(12, "month")).format("YYYY-MM-DD")
	);
	//! This end date is always 6 months in the past
	const [endDate, setEndDate] = useState(
		dayjs(dayjs().subtract(6, "month")).format("YYYY-MM-DD")
	);

	useEffect(() => {
		console.log("analysing data");
		rawData && analyseData();
	}, [rawData]);

	const postcodeIsValid = (p = postCode.split("+").join(" ")) => {
		let postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
		return postcodeRegEx.test(p);
	};

	const handleSubmit = async () => {
		if (!postcodeIsValid()) {
			return;
		}

		notifications.hideNotification("networkErrorNotification");

		notifications.showNotification({
			id: "fetchingNotification",
			title: "Scraping planning applications",
			message:
				"Please bare with us, we are fetching large amounts of planning applications, this can take up to 30 seconds.",
			autoClose: 30000,
			loading: true,
		});

		setRawData("");
		setIsDataLoading(true);
		console.log("submiting");

		try {
			setRawData("");
			setIsDataLoading(true);
			console.log("submiting");

			const response = await GET_SIMPLE_SEARCH(
				postCode,
				radius,
				appSize,
				appType,
				// appState,
				requestSize,
				startDate,
				endDate
			);
			console.log(response.data);
			setRawData(response.data.records);

			notifications.hideNotification("fetchingNotification");
		} catch (error) {
			console.log(JSON.stringify(error));
			console.log(error.response);
			if (error.message === "Network Error") {
				notifications.hideNotification("fetchingNotification");
				notifications.showNotification({
					id: "networkErrorNotification",
					title: `${error}`,
					message: `Postcode not found...`,
					color: "red",
					className: "my-notification-class",
					style: { backgroundColor: "red" },
					autoClose: 5000,
				});
			}
		}
	};

	const confidenceLevelColor = {
		low: "red",
		medium: "orange",
		high: "green",
	};

	const analyseData = async () => {
		setResponseSize(rawData.length);
		setDurationData(getDecisionDatesStats(rawData));
		setIsDataLoading(false);
	};

	//

	return (
		<>
			<SimpleGrid
				cols={2}
				spacing="xs"
				breakpoints={[{ maxWidth: 900, cols: 1, spacing: "xs" }]}
			>
				<div>
					<Paper
						shadow="xs"
						p="md"
						m="sm"
						// style={{ width: "100%" }}
						withBorder
					>
						<Group
							grow
							style={{ display: "flex", alignItems: "flex-end" }}
						>
							<TextInput
								clearable="true"
								label="Enter your postcode"
								placeholder="AA9A 9AA"
								value={postCode.split("+").join(" ")}
								onChange={(event) =>
									setPostCode(
										event.currentTarget.value
											.split(" ")
											.join("+")
											.toUpperCase()
									)
								}
							/>
							<Button onClick={handleSubmit} fullWidth>Search</Button>
						</Group>
					</Paper>
					<CardResults
						style={{ height: "100%" }}
						confidenceLevel={getConfidenceLevel(durationData)}
						confidenceLevelColor={
							confidenceLevelColor[getConfidenceLevel(durationData)]
						}
						requestSize={requestSize}
						responseSize={responseSize}
						durationData={durationData}
					/>
				</div>
				<Paper
					style={{
						overflow: "auto",
						border: getConfidenceLevel(durationData)
							? `2px solid ${
									theme.colors[
										confidenceLevelColor[
											getConfidenceLevel(durationData)
										]
									][9]
							  }`
							: "",
					}}
					shadow="md"
					p="xs"
					m="sm"
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					withBorder
				>
					<ChartApp
						chartType="line"
						thresholdValueIndex="1"
						chartLabel="Decision Duration / Days"
						dataset={durationData}
						labels={Options.duration()}
					/>
				</Paper>
			</SimpleGrid>

			<Accordion p="sm">
				<Accordion.Item
					styles={{
						content: { padding: 0 },
						contentInner: { padding: 0 },
					}}
					label={"Detailed List: " + responseSize + " Applications"}
				>
					{!isDataLoading && <CardList rawData={rawData} />}
				</Accordion.Item>
			</Accordion>
		</>
	);
};

export default PageSimpleSearch;
