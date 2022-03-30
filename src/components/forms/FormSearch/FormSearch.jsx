import React, { useState } from "react";
import "./FormSearch.scss";
import { useNotifications } from "@mantine/notifications";
import { Divider } from "@mantine/core";
import dayjs from "dayjs";

import InputText from "../../inputs/InputText/InputText";
import InputSelect from "../../inputs/InputSelect/InputSelect";
import InputNumber from "../../inputs/InputNumber/InputNumber";
import InputDate from "../../inputs/InputDate/InputDate";

import {
	TextInput,
	NumberInput,
	Select,
	Button,
	InputWrapper,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import Options from "../../../utils/queryOptions.mjs";
import { GET_QUERY_SEARCH } from "../../../utils/apiCalls.mjs";

const FormSearch = ({ setRawData, setIsDataLoading }) => {
	const notifications = useNotifications();
	const [responseSize, setResponseSize] = useState("");
	const [authority, setAuthority] = useState("Merton");
	const [appSize, setAppSize] = useState("Small");
	const [appType, setAppType] = useState("Full");
	const [appState, setAppState] = useState("");
  const [resultsSize, setResultsSize] = useState(10);
  const [searchTerms, setSearchTerms] = useState("");

  //! This start date is always 12 months in the past
  const [startDate, setStartDate] = useState(
		dayjs(dayjs().subtract(12, "month")).format("YYYY-MM-DD")
  );
  //! This end date is always 6 months in the past
  const [endDate, setEndDate] = useState(
		dayjs(dayjs().subtract(6, "month")).format("YYYY-MM-DD")
  );

  const handleStartDateChange = (val) => {
		const formattedDate = dayjs(val).format("YYYY-MM-DD");
		setStartDate(formattedDate);
		console.log(startDate);
  };

  const handleEndDateChange = (val) => {
		const formattedDate = dayjs(val).format("YYYY-MM-DD");
		setEndDate(formattedDate);
		console.log(endDate);
  };

  const handleSubmit = async (e) => {
		notifications.hideNotification("networkErrorNotification");

		console.log("✔ is loading to true ");
		setRawData("");
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

		try {
			const response = await GET_QUERY_SEARCH(
				authority,
				appType,
				appState,
				appSize,
				searchTerms,
				resultsSize,
				startDate,
				endDate
			);
			console.log("setting raw data");
			console.log(response.data.records);
			setRawData(response.data.records);
			setResponseSize(response.data.records.length);
      notifications.hideNotification("fetchingNotification");
      
      response.status===400 && console.log(response.data.error);
		} catch (error) {
			if (error.message === "Network Error") {
				notifications.hideNotification("fetchingNotification");
				notifications.showNotification({
					id: "networkErrorNotification",
					title: `${error}`,
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
			<div className="form">FormSearch</div>
			<form
				className="form"
				style={{ display: "flex", flexDirection: "column" }}
			>
				<div className="form__container">
					<InputWrapper
						id="input-authority"
						required={true}
						// label="Local Authority Required"
						// description="Please select a local authority"
						error={!authority ? "This field is required" : ""}
					>
						<Select
							clearable="true"
							searchable
							required
							value={authority}
							onChange={setAuthority}
							label="Local Authority"
							placeholder="Local Authority"
							data={Options.authority()}
						/>
					</InputWrapper>

					<Select
						clearable="true"
						value={appSize}
						onChange={setAppSize}
						label="Application Size"
						placeholder="Application Size"
						data={Options.appSize()}
					/>

					<Select
						clearable="true"
						value={appType}
						onChange={setAppType}
						label="Application Type"
						placeholder="Application Type"
						data={Options.appType()}
					/>

					<Select
						clearable="false"
						value={appState}
						onChange={setAppState}
						label="Application State"
						placeholder="Application State"
						data={Options.appState()}
					/>

					<DatePicker
						clearable="false"
						value={new Date(startDate)}
						label="Start Date"
						maxDate={new Date(endDate)}
						onChange={handleStartDateChange}
					/>

					<DatePicker
						clearable="false"
						value={new Date(endDate)}
						label="End Date"
						minDate={new Date(startDate)}
						onChange={handleEndDateChange}
					/>

					<NumberInput
						clearable="true"
						min={10}
						value={resultsSize}
						label="Number of Applications"
						placeholder="Number of Applications"
						onChange={(val) => setResultsSize(val)}
					/>

					<TextInput
						clearable="true"
						value={searchTerms}
						onChange={(event) =>
							setSearchTerms(event.currentTarget.value)
						}
						label="Search Keywords"
						placeholder="Search Keywords"
					/>

					<Button fullWidth onClick={handleSubmit}>
						Search
					</Button>
				</div>
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
