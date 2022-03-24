import React, { useState } from "react";

import InputText from "../inputs/InputText/InputText";
import InputSelect from "../inputs/InputSelect/InputSelect";
import InputNumber from "../inputs/InputNumber/InputNumber";
import InputDate from "../inputs/InputDate/InputDate";

import Options from "../../utils/queryOptions.mjs";
import dayjs from "dayjs";

import { GET_QUERY_SEARCH } from "../../utils/apiCalls.mjs";

const authority_options = Options.authority();
const app_size_options = Options.appSize();
const app_type_options = Options.appType();
const app_state_options = Options.appState();

const FormSearch = ({ analyseData, setRawData, setIsDataLoading }) => {
	const [authority, setAuthority] = useState("Merton");
	const handleAuthChange = (e) => {
		setAuthority(e.target.value);
	};

	const [appSize, setAppSize] = useState("Small");
	const handleAppSizeChange = (e) => {
		setAppSize(e.target.value);
	};

	const [appType, setAppType] = useState("Full");
	const handleAppTypeChange = (e) => {
		setAppType(e.target.value);
	};

	const [appState, setAppState] = useState("");
	const handleAppStateChange = (e) => {
		setAppState(e.target.value);
	};

	const [recentAppCount, setRecentAppCount] = useState(0);
	const handleRecentChange = (e) => {
		setRecentAppCount(e.target.value);
	};

	const [resultsSize, setResultsSize] = useState(10);
	const handleResultsChange = (e) => {
		setResultsSize(e.target.value);
	};

	const [startDate, setStartDate] = useState("");
	const handleStartDateChange = (e) => {
		console.log(e.target.value);
		const formattedDate = dayjs(e.target.value).format("YYYY-MM-DD");
		setStartDate(formattedDate);
		console.log(startDate);
	};

	const [endDate, setEndDate] = useState("");
	const handleEndDateChange = (e) => {
		const formattedDate = dayjs(e.target.value).format("YYYY-MM-DD");
		setEndDate(formattedDate);
		console.log(endDate);
	};

	const handleSubmit = async (e) => {
		console.log("✔ is loading to true ");
		setIsDataLoading(true);

		console.log("scraping data....");
		e.preventDefault();

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
		console.log("response is back...");
		// analyseData(resultsSize, response.data.records);
		console.log("setting raw data");
		setRawData(response.data.records);
		console.log(response.data.records);
	};

	return (
		<>
			<div>FormSearch</div>
			<form
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column" }}
			>
				<InputSelect
					label="Authority"
					name="auth"
					value={authority}
					options={authority_options}
					handleOnChange={handleAuthChange}
				/>

				<InputSelect
					label="App Size"
					name="app_size"
					value={appSize}
					options={app_size_options}
					handleOnChange={handleAppSizeChange}
				/>

				<InputSelect
					label="App Type"
					name="app_type"
					value={appType}
					options={app_type_options}
					handleOnChange={handleAppTypeChange}
				/>
				<InputSelect
					label="App State"
					name="app_state"
					value={appState}
					options={app_state_options}
					handleOnChange={handleAppStateChange}
				/>

				<InputDate
					label="Start Date"
					name="start_date"
					value={startDate}
					handleOnChange={handleStartDateChange}
				/>

				<InputDate
					label="End Date"
					name="end_date"
					value={endDate}
					handleOnChange={handleEndDateChange}
				/>

				<InputNumber
					label="Days in past"
					value={recentAppCount}
					min={0}
					handleOnChange={handleRecentChange}
				/>

				<InputNumber
					label="Results Number"
					value={resultsSize}
					min={0}
					handleOnChange={handleResultsChange}
				/>
				<button type="submit">Search</button>
			</form>
		</>
	);
};

export default FormSearch;
