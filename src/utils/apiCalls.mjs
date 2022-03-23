import axios from "axios";

const GET_QUERY_SEARCH = (auth, appType, appState, recent) => {
	return axios.get(
		process.env.REACT_APP_PLANIT_BASE_URL +
			process.env.REACT_APP_QUERY_URL +
			"auth=" +
			auth +
			"&app_type=" +
			appType +
			"&pg_sz=10" +
			"&end_date=2021-07-21" +
			"&select=app_size," +
			"app_state," +
			"app_type," +
			"decided_date," +
			"other_fields->n_statutory_days," +
			"other_fields->status," +
			"other_fields->target_decision_date," +
			"other_fields->date_validated"

		// `${process.env.REACT_APP_PLANIT_BASE_URL}${process.env.REACT_APP_QUERY_URL}auth=${auth}&pg_sz=100&end_date=2021-05-21&select=app_size,app_state,app_type,decided_date,other_fields->n_statutory_days,other_fields->status,other_fields->target_decision_date,other_fields->date_validated`
	);
};

export { GET_QUERY_SEARCH };
