import axios from "axios";

const GET_QUERY_SEARCH = (
	auth,
	appType,
	appState,
	appSize,
	recentAppCount,
	resultsSize,
	start_date,
	end_date
) => {
	return axios.get(
		process.env.REACT_APP_PLANIT_BASE_URL +
			process.env.REACT_APP_QUERY_URL +
			"auth=" +
			auth +
			"&app_type=" +
			appType +
			"&app_state=" +
			appState +
			"&app_size=" +
			appSize +
			"&pg_sz=" +
			resultsSize +
			"&recent=" +
			recentAppCount +
			"&start_date=" +
			start_date +
			"&end_date=" +
			end_date +
			"&select=app_size," +
			"scraper_name," +
			"app_state," +
			"app_type," +
			"other_fields->application_type," +
			//* Application details -------------
			"other_fields->status," +
			"other_fields->decision," +
			"other_fields->development_type," +
			//* Application Dates -------------
			"other_fields->n_statutory_days," +
			"other_fields->date_validated," +
			"other_fields->date_received," +
			"other_fields->target_decision_date," +
			"decided_date," +
			"other_fields->decision_date"
	);
};

export { GET_QUERY_SEARCH };
