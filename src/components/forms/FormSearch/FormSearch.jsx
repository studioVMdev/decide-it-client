import React, { useState } from "react";
import "./FormSearch.scss";
import { useNotifications } from "@mantine/notifications";
import { Divider, SimpleGrid, Paper, Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { Search } from "tabler-icons-react";
import { TextInput, NumberInput, Select, Button, Box } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../../firebase";

// import { getAuth } from "firebase/auth";

import Options from "../../../utils/queryOptions.mjs";
import { GET_QUERY_SEARCH } from "../../../utils/apiCalls.mjs";
import SaveSearch from "../../SaveSearch/SaveSearch";

const FormSearch = ({
	setRawData,
	setIsDataLoading,
	setRequestSize,
	// setResponseSize,
}) => {
	const [user, loading, error] = useAuthState(auth);

	const notifications = useNotifications();
	const [responseSize, setResponseSize] = useState("");

	const [authority, setAuthority] = useState("Merton");
	const [appSize, setAppSize] = useState("Small");
	const [appType, setAppType] = useState("Full");
	const [appState, setAppState] = useState("");
	const [sampleSize, setSampleSize] = useState(10);
	// const [resultsSize, setResultsSize] = useState("");

	// const [searchedResultsSize, setSearchedResultsSize] = useState("");
	const [searchTerms, setSearchTerms] = useState("");
	//* This start date is always 12 months in the past
	const [startDate, setStartDate] = useState(
		dayjs(dayjs().subtract(12, "month")).format("YYYY-MM-DD")
	);
	//* This end date is always 6 months in the past
	const [endDate, setEndDate] = useState(
		dayjs(dayjs().subtract(6, "month")).format("YYYY-MM-DD")
	);

	const searchParams = {
		auth: authority,
		app_size: appSize,
		app_type: appType,
		app_state: appState,
		pg_sz: sampleSize,
		start_date: startDate,
		end_date: endDate,
		search_terms: searchTerms,
	};

	const populateForm = (savedParams) => {
		const {
			auth,
			app_size,
			app_type,
			app_state,
			pg_sz,
			start_date,
			end_date,
			search_terms,
		} = savedParams;
		setAuthority(auth);
		setAppSize(app_size);
		setAppType(app_type);
		setAppState(app_state);
		setSampleSize(pg_sz);
		setStartDate(start_date);
		setEndDate(end_date);
		setSearchTerms(search_terms);
	};

	const handleStartDateChange = (val) => {
		const formattedDate = dayjs(val).format("YYYY-MM-DD");
		setStartDate(formattedDate);
		// console.log(startDate);
	};

	const handleEndDateChange = (val) => {
		const formattedDate = dayjs(val).format("YYYY-MM-DD");
		setEndDate(formattedDate);
		// console.log(endDate);
	};

	const handleSubmit = async (e) => {
		if (
			!authority ||
			startDate === "Invalid Date" ||
			endDate === "Invalid Date"
		)
			return;

		notifications.hideNotification("networkErrorNotification");
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
				sampleSize,
				startDate,
				endDate
			);
			// console.log("setting raw data");
			// console.log(response.data.records);
			setRawData(response.data.records);
			setResponseSize(response.data.records.length);
			// setSearchedResultsSize(resultsSize);
			setRequestSize(sampleSize);
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
			<Paper shadow="xs" p="md" m="sm" withBorder>
				<form
					className="form"
					grow="true"
					style={{ display: "flex", flexDirection: "column" }}
				>
					<div className="form__container">
						<SimpleGrid
							cols={2}
							spacing="xs"
							breakpoints={[{ maxWidth: 500, cols: 1, spacing: "xs" }]}
						>
							<SimpleGrid
								cols={2}
								spacing="xs"
								breakpoints={[
									{ maxWidth: 900, cols: 1, spacing: "xs" },
								]}
							>
								<Group
									className="form__group-wrapper-inner"
									spacing="md"
									sx={{ flexDirection: "column" }}
								>
									<Select
										error={!authority ? true : false}
										clearable="true"
										searchable
										required
										value={authority}
										onChange={setAuthority}
										label="Local Authority"
										placeholder="Local Authority"
										data={Options.authority()}
									/>

									<Select
										clearable="true"
										value={appSize}
										onChange={setAppSize}
										label="Application Size"
										placeholder="Application Size"
										data={Options.appSize()}
									/>
								</Group>
								<Group
									className="form__group-wrapper-inner"
									spacing="md"
									sx={{ flexDirection: "column" }}
								>
									<Select
										clearable="true"
										value={appType}
										onChange={setAppType}
										label="Application Type"
										placeholder="Application Type"
										data={Options.appType()}
									/>

									<Select
										clearable="true"
										value={appState}
										onChange={setAppState}
										label="Application State"
										placeholder="Application State"
										data={Options.appState()}
									/>
								</Group>
							</SimpleGrid>

							<SimpleGrid
								cols={2}
								spacing="xs"
								breakpoints={[
									{ maxWidth: 900, cols: 1, spacing: "xs" },
								]}
							>
								<Group
									className="form__group-wrapper-inner"
									spacing="md"
									sx={{ flexDirection: "column" }}
								>
									<DatePicker
										placeholder="Start Date"
										defaultValue={new Date(startDate)}
										required
										error={
											startDate === "Invalid Date" ? true : false
										}
										label="Start Date"
										maxDate={new Date(endDate)}
										onChange={handleStartDateChange}
									/>

									<DatePicker
										placeholder="End Date"
										defaultValue={new Date(endDate)}
										required
										error={endDate === "Invalid Date" ? true : false}
										label="End Date"
										minDate={new Date(startDate)}
										onChange={handleEndDateChange}
									/>
								</Group>

								<Group
									className="form__group-wrapper-inner"
									spacing="md"
									sx={{ flexDirection: "column" }}
								>
									<NumberInput
										min={10}
										value={sampleSize}
										label="Sample Size"
										placeholder="Sample Size"
										onChange={(val) => setSampleSize(val)}
									/>

									<TextInput
										clearable="true"
										value={searchTerms
											.split("%20")
											.join(" ")
											.split("%22")
											.join("")}
										onChange={(event) =>
											setSearchTerms(
												event.currentTarget.value
													? "%22" +
															event.currentTarget.value
																.split(" ")
																.join("%20") +
															"%22"
													: ""
											)
										}
										label="Search Keywords"
										placeholder="Search Keywords"
									/>
								</Group>
							</SimpleGrid>
						</SimpleGrid>

						<Button mt={20} fullWidth onClick={handleSubmit}>
							Search
						</Button>
					</div>
				</form>
				{user && (
					<SaveSearch
						searchParams={searchParams}
						populateForm={populateForm}
					/>
				)}
			</Paper>
			{/* <Divider
				my="xs"
				variant="dashed"
				labelPosition="center"
				label={
					<>
						<Search size={12} />
						<Box ml={5}>Search results</Box>
					</>
				}
			/> */}
		</>
	);
};

export default FormSearch;
