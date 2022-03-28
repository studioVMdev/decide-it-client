import React, { useState } from "react";
import { useNotifications } from "@mantine/notifications";
import { Divider } from "@mantine/core";
import dayjs from "dayjs";

import InputText from "../inputs/InputText/InputText";
import InputSelect from "../inputs/InputSelect/InputSelect";
import InputNumber from "../inputs/InputNumber/InputNumber";
import InputDate from "../inputs/InputDate/InputDate";

import { TextInput, NumberInput, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import Options from "../../utils/queryOptions.mjs";
import { GET_QUERY_SEARCH } from "../../utils/apiCalls.mjs";

const authority_options = Options.authority();
const app_size_options = Options.appSize();
const app_type_options = Options.appType();
const app_state_options = Options.appState();

const FormSearch = ({ setRawData, setIsDataLoading }) => {
	const notifications = useNotifications();
	const [responseSize, setResponseSize] = useState("");

	const [authority, setAuthority] = useState("Merton");
	// const handleAuthChange = (e) => {
	// setAuthority(e.target.value);
	// };

	const [appSize, setAppSize] = useState("Small");
	// const handleAppSizeChange = (e) => {
	// 	setAppSize(e.target.value);
	// };

	const [appType, setAppType] = useState("Full");
	// const handleAppTypeChange = (e) => {
	// 	setAppType(e.target.value);
	// };

	const [appState, setAppState] = useState("");
	// const handleAppStateChange = (e) => {
	// 	setAppState(e.target.value);
	// };

	const [recentAppCount, setRecentAppCount] = useState(0);
	// const handleRecentChange = (e) => {
	// 	setRecentAppCount(e.target.value);
	// };

	const [resultsSize, setResultsSize] = useState(10);
	// const handleResultsChange = (e) => {
	// 	setResultsSize(e.target.value);
	// };

	const [startDate, setStartDate] = useState("2021-03-12");
	// const handleStartDateChange = (e) => {
	// 	console.log(e.target.value);
	// 	const formattedDate = dayjs(e.target.value).format("YYYY-MM-DD");
	// 	setStartDate(formattedDate);
	// 	console.log(startDate);
	// };

	const handleStartDateChange = (val) => {
		const formattedDate = dayjs(val).format("YYYY-MM-DD");
		setStartDate(formattedDate);
		console.log(startDate);
	};

	const [endDate, setEndDate] = useState("2021-08-12");
	// const handleEndDateChange = (e) => {
	// 	const formattedDate = dayjs(e.target.value).format("YYYY-MM-DD");
	// 	setEndDate(formattedDate);
	// 	console.log(endDate);
	// };

	const handleEndDateChange = (val) => {
		const formattedDate = dayjs(val).format("YYYY-MM-DD");
		setEndDate(formattedDate);
		console.log(endDate);
	};

	const [searchTerms, setSearchTerms] = useState("");

	const handleSubmit = async (e) => {
		notifications.hideNotification("networkErrorNotification");

		console.log("✔ is loading to true ");
		// fetchingNotification();

		setIsDataLoading(true);

		notifications.showNotification({
			id: "fetchingNotification",
			title: "Scraping planning applications",
			message:
				"Please bare with us, we are fetching large amounts of planning applications, this can take up to 30 seconds.",
			autoClose: 30000,
			loading: true,
		});

		console.log("scraping data....");
		e.preventDefault();
		try {
			const response = await GET_QUERY_SEARCH(
				authority,
				appType,
				appState,
				appSize,
				recentAppCount,
				resultsSize,
				startDate,
				endDate
			);
			console.log("setting raw data");
			console.log(response.data.records);
			setRawData(response.data.records);
			setResponseSize(response.data.records.length);
			notifications.hideNotification("fetchingNotification");
		} catch (err) {
			if (err.message === "Network Error") {
				notifications.hideNotification("fetchingNotification");

				notifications.showNotification({
					id: "networkErrorNotification",
					title: `${err}`,
					message: `Please try again...`,
					color: "red",
					className: "my-notification-class",
					style: { backgroundColor: "red" },
					autoClose: 5000,
				});
			}
		}
	};

	return (
		<>
			<div>FormSearch</div>
			<form
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column" }}
			>
				<Select
					value={authority}
					onChange={setAuthority}
					label="Local Authority"
					placeholder="Local Authority"
					data={authority_options}
				/>
				{/* <InputSelect
					label="Authority"
					name="auth"
					value={authority}
					options={authority_options}
					handleOnChange={handleAuthChange}
				/> */}
				<Select
					value={appSize}
					onChange={setAppSize}
					label="Application Size"
					placeholder="Application Size"
					data={app_size_options}
				/>
				{/*  <InputSelect
					label="App Size"
					name="app_size"
					value={appSize}
					options={app_size_options}
					handleOnChange={handleAppSizeChange}
        /> */}
				<Select
					value={appType}
					onChange={setAppType}
					label="Application Type"
					placeholder="Application Type"
					data={app_type_options}
				/>
				{/* <InputSelect
					label="App Type"
					name="app_type"
					value={appType}
					options={app_type_options}
					handleOnChange={handleAppTypeChange}
				/> */}
				<Select
					value={appState}
					onChange={setAppState}
					label="Application State"
					placeholder="Application State"
					data={app_state_options}
				/>
				{/* 
				<InputSelect
					label="App State"
					name="app_state"
					value={appState}
					options={app_state_options}
					handleOnChange={handleAppStateChange}
				/> */}
				{/* <InputDate
					label="Start Date"
					name="start_date"
					value={startDate}
					handleOnChange={handleStartDateChange}
        />
         */}

				<DatePicker
					value={new Date(startDate)}
					label="Start Date"
					maxDate={new Date(endDate)}
					onChange={handleStartDateChange}
				/>

				<DatePicker
					value={new Date(endDate)}
					label="End Date"
					minDate={new Date(startDate)}
					onChange={handleEndDateChange}
				/>

				{/* <DatePicker
					// value={dayjs(startDate).format("MM-DD-YYYY")}
					value={new Date(startDate)}
					label="test Date"
					onChange={(val) => console.log(val)}
				/> */}
				{/* 
				<InputDate
					min={startDate}
					label="Start Date"
					name="end_date"
					value={endDate}
					handleOnChange={handleEndDateChange}
				/> */}

				<NumberInput
					value={resultsSize}
					label="Number of Applications"
					placeholder="Number of Applications"
					onChange={(val) => setResultsSize(val)}
				/>

				<TextInput
					value={searchTerms}
					onChange={(event) => setSearchTerms(event.currentTarget.value)}
					label="Search Keywords"
					placeholder="Search Keywords"
				/>
				{/* <InputNumber
					label="Results Number"
					value={resultsSize}
					min={0}
					handleOnChange={handleResultsChange}
				/> */}
				<button type="submit">Search</button>
			</form>
			<Divider my="xs" label="Search Results" labelPosition="center" />
			<h2 className="total-results">
				{responseSize &&
					`Retrieved ${responseSize} out of ${resultsSize} requested applications.`}
			</h2>
		</>
	);
};

export default FormSearch;
