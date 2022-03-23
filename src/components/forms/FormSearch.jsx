import React, { useState } from "react";

import InputText from "../inputs/InputText/InputText";
import InputSelect from "../inputs/InputSelect/InputSelect";
import InputNumber from "../inputs/InputNumber/InputNumber";

import { GET_QUERY_SEARCH } from "../../utils/apiCalls.mjs";

const auth_options = ["Merton", "Tower+Hamlets"];

const app_type_options = ["Full", "Outline"];

const app_state_options = ["Conditions", "Permitted"];

const FormSearch = () => {
	const [auth, setAuth] = useState("");
	const handleAuthChange = (e) => {
		setAuth(e.target.value);
	};

	const [appType, setAppType] = useState("");
	const handleAppTypeChange = (e) => {
		setAppType(e.target.value);
	};

	const [appState, setAppState] = useState("");
	const handleAppStateChange = (e) => {
		setAppState(e.target.value);
	};

	const [recent, setRecent] = useState("");
	const handleRecentChange = (e) => {
		setRecent(e.target.value);
	};

	const handleSubmit = async (e) => {
		console.log("clicked");
		e.preventDefault();
		const response = await GET_QUERY_SEARCH(auth, appType, appState, recent);

		console.log(response.data);
	};

	return (
		<>
			<div>FormSearch</div>
			<form
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column" }}
			>
				{/* <InputText name="Borough" label="Borough" /> */}
				<InputSelect
					label="Authority"
					name="auth"
					value={auth}
					options={auth_options}
					handleOnChange={handleAuthChange}
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
				<InputNumber
					label="Days in past"
					handleOnChange={handleRecentChange}
				/>
				<button type="submit">Search</button>
			</form>
		</>
	);
};

export default FormSearch;
