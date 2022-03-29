import React from "react";
import "./PageSimpleSearch.scss";
import Options from "../../utils/queryOptions.mjs";

import { GET_SIMPLE_SEARCH } from "../../utils/apiCalls.mjs";

import { useState, useEffect } from "react";
import {
	Stepper,
	Button,
	Group,
	TextInput,
	NumberInput,
	Select,
	Text,
	Paper,
} from "@mantine/core";

const PageSimpleSearch = () => {
	const [active, setActive] = useState(0);
	const nextStep = () =>
		setActive((current) => (current < 3 ? current + 1 : current));
	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	const [isDataLoading, setIsDataLoading] = useState(true);
	const [rawData, setRawData] = useState("");
	const [responseSize, setResponseSize] = useState("");

	const [postCode, setPostCode] = useState("");
	const [radius, setRadius] = useState(1);
	const [appSize, setAppSize] = useState("");
	const [appType, setAppType] = useState("");
	const [resultsSize, setResultsSize] = useState(500);
	const [startDate, setStartDate] = useState("2020-05-09");
	const [endDate, setEndDate] = useState("2020-09-09");

	useEffect(() => {
		console.log("analysing data");
	}, [rawData]);

	const handleSubmit = async () => {
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

		setRawData(response.data.records);
		setResponseSize(response.data.records.length);

		console.log(response.data);
	};

	const firstQuestionJSX = (
		<>
			<Group position="center" grow>
				<TextInput
					clearable="true"
					value={postCode}
					onChange={(event) =>
						setPostCode(event.currentTarget.value.split(" ").join("+"))
					}
					label="Postcode"
					placeholder="Enter Postcode"
				/>
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
		</>
	);
};

export default PageSimpleSearch;
