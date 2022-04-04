import React from "react";
import "./PageSimpleSearch.scss";
import Options from "../../utils/queryOptions.mjs";
import getDecisionDatesStats from "../../utils/decisionDatesStats.mjs";
import dayjs from "dayjs";
import { useNotifications } from "@mantine/notifications";
import { Accordion } from "@mantine/core";
import ChartApp from "../../components/charts/ChartApp";
import CardList from "../../components/CardList/CardList";

import { GET_SIMPLE_SEARCH } from "../../utils/apiCalls.mjs";

import { useState, useEffect } from "react";
import {
	Stepper,
	Button,
	Group,
	InputWrapper,
	TextInput,
	NumberInput,
	Select,
	Text,
	Paper,
} from "@mantine/core";

const PageSimpleSearch = () => {
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
	const [isValidPostcode, setIsValidPostcode] = useState(true);
	const [radius, setRadius] = useState(1);
	const [appSize, setAppSize] = useState("");
	const [appType, setAppType] = useState("");
	const [resultsSize, setResultsSize] = useState(50);
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

	const postcodeIsValid = (p) => {
		let postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
		return postcodeRegEx.test(p);
	};

	const handleSubmit = async () => {
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
				resultsSize,
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

	const analyseData = async () => {
		setResponseSize(rawData.length);
		setDurationData(getDecisionDatesStats(rawData));
		setIsDataLoading(false);
	};

	const firstQuestionJSX = (
		<>
			<Group position="center" grow>
				<InputWrapper
					id="input-authority"
					required={true}
					// label="Local Authority Required"
					// description="Please select a local authority"
					error={
						!isValidPostcode ? "Please enter a valid UK postcode" : ""
					}
				>
					<TextInput
						clearable="true"
						value={postCode.split("+").join(" ")}
						onChange={(event) =>
							setPostCode(
								event.currentTarget.value
									.split(" ")
									.join("+")
									.toUpperCase()
							)
						}
						label="Postcode"
						placeholder="Enter Postcode"
					/>
				</InputWrapper>

				<NumberInput
					clearable="true"
					value={radius}
					min={1}
					label="Radius"
					placeholder="Radius"
					onChange={(val) => setRadius(val)}
				/>
			</Group>
		</>
	);

	const secondQuestionJSX = (
		<>
			<Select
				clearable="true"
				value={appSize}
				onChange={setAppSize}
				label="Application Size"
				placeholder="Application Size"
				data={Options.appSize()}
			/>
		</>
	);

	const thirdQuestionJSX = (
		<>
			<Select
				clearable="true"
				value={appType}
				onChange={setAppType}
				label="Application Type"
				placeholder="Application Type"
				data={Options.appType()}
			/>
		</>
	);

	const finalStepJSX = (
		<>
			<Paper shadow="xs" p="md">
				<Text weight={700}>
					All set, we are ready to perform the search! Let's go!
				</Text>
			</Paper>
		</>
	);

	return (
		<>
			<Paper shadow="xs" p="md" m="sm" withBorder>
				<Stepper
					active={active}
					iconSize={32}
					onStepClick={setActive}
					// orientation="vertical"
					breakpoint="sm"
				>
					<Stepper.Step
						label="Fist step"
						description="Enter Your Postcode"
						allowStepSelect={active > 0}
					>
						Enter Your Postcode in this format AA9A 9AA
					</Stepper.Step>
					<Stepper.Step
						label="Second step"
						description="Verify email"
						allowStepSelect={active > 1}
					>
						Step 2 content: Verify email
					</Stepper.Step>
					<Stepper.Step
						label="Final step"
						description="Get full access"
						allowStepSelect={active > 2}
					>
						Step 3 content: Get full access
					</Stepper.Step>
					<Stepper.Completed>
						All set, we are ready to perform the search! Let's
					</Stepper.Completed>
				</Stepper>

				<>
					{active === 0 && firstQuestionJSX}
					{active === 1 && secondQuestionJSX}
					{active === 2 && thirdQuestionJSX}
					{active === 3 && finalStepJSX}
				</>

				<Group position="center" mt="xl">
					<Button variant="default" onClick={prevStep}>
						Back
					</Button>
					{active < 3 ? (
						<Button onClick={nextStep}>Next step</Button>
					) : (
						<Button onClick={handleSubmit}>Submit</Button>
					)}
				</Group>
			</Paper>

			<ChartApp
				chartType="line"
				thresholdValueIndex="1"
				chartLabel="Decision Duration / Days"
				dataset={durationData}
				labels={Options.duration()}
			/>
			<Accordion>
				<Accordion.Item label="Detailed Applications List">
					{!isDataLoading && <CardList rawData={rawData} />}
				</Accordion.Item>
			</Accordion>
		</>
	);
};;

export default PageSimpleSearch;
