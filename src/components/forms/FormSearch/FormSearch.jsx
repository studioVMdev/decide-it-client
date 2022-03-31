import React, { useState } from "react";
import "./FormSearch.scss";
import { useNotifications } from "@mantine/notifications";
import { Divider, SimpleGrid, Paper, Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { Search } from "tabler-icons-react";
import {
	TextInput,
	NumberInput,
	Select,
	Button,
	InputWrapper,
	Box,
} from "@mantine/core";

import Options from "../../../utils/queryOptions.mjs";
import { GET_QUERY_SEARCH } from "../../../utils/apiCalls.mjs";
import { auth } from "../../../firebase";

const FormSearch = ({ setRawData, setIsDataLoading }) => {
	const notifications = useNotifications();
	const [responseSize, setResponseSize] = useState("");
	const [authority, setAuthority] = useState("Merton");
	const [appSize, setAppSize] = useState("Small");
	const [appType, setAppType] = useState("Full");
	const [appState, setAppState] = useState("");
	const [resultsSize, setResultsSize] = useState(10);
	const [searchedResultsSize, setSearchedResultsSize] = useState("");
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
		if (!authority || !startDate || !endDate) return;

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
			setSearchedResultsSize(resultsSize);
			notifications.hideNotification("fetchingNotification");

			response.status === 400 && console.log(response.data.error);
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
			<Paper shadow="xs" p="md" m="md" withBorder>
				<form
					className="form"
					grow
					style={{ display: "flex", flexDirection: "column" }}
				>
					<div className="form__container">
						<SimpleGrid
							cols={2}
							spacing="xs"
							breakpoints={[{ maxWidth: 500, cols: 1, spacing: "xs" }]}
						>
							<Group
								className="form__group-wrapper"
								spacing="md"
								sx={{ flexDirection: "column" }}
							>
								{/* <InputWrapper
									id="input-authority"
									required={true}
									// label="Local Authority Required"
									// description="Please select a local authority"
									error={!authority ? "This field is required" : ""}
								> */}
								<Select
									error={!authority ? true : false}
									clearable
									searchable
									required
									value={authority}
									onChange={setAuthority}
									label="Local Authority"
									placeholder="Local Authority"
									data={Options.authority()}
								/>
								{/* </InputWrapper> */}

								<Select
									clearable
									value={appSize}
									onChange={setAppSize}
									label="Application Size"
									placeholder="Application Size"
									data={Options.appSize()}
								/>

								<Select
									clearable
									value={appType}
									onChange={setAppType}
									label="Application Type"
									placeholder="Application Type"
									data={Options.appType()}
								/>

								<Select
									clearable
									value={appState}
									onChange={setAppState}
									label="Application State"
									placeholder="Application State"
									data={Options.appState()}
								/>
							</Group>

							<Group
								className="form__group-wrapper"
								spacing="md"
								style={{ display: "flex", flexDirection: "column" }}
							>
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

								<NumberInput
									min={10}
									value={resultsSize}
									label="Number of Applications"
									placeholder="Number of Applications"
									onChange={(val) => setResultsSize(val)}
								/>

								<TextInput
									clearable
									value={searchTerms}
									onChange={(event) =>
										setSearchTerms(event.currentTarget.value)
									}
									label="Search Keywords"
									placeholder="Search Keywords"
								/>
							</Group>
						</SimpleGrid>

						<Button mt={20} fullWidth onClick={handleSubmit}>
							Search
						</Button>
					</div>
				</form>
			</Paper>
			<Divider
				my="xs"
				variant="dashed"
				labelPosition="center"
				label={
					<>
						<Search size={12} />
						<Box ml={5}>Search results</Box>
					</>
				}
			/>
			<h2 className="total-results">
				{responseSize &&
					`Retrieved ${responseSize} out of ${searchedResultsSize} requested applications.`}
			</h2>
		</>
	);
};

export default FormSearch;
