import axios from "axios";

const staticQueryFields =
	"&select=app_size," +
	"scraper_name," +
	"app_state," +
	"app_type," +
	"description," +
	"other_fields->application_type," +
	"other_fields->description," +
	"other_fields->status," +
	"other_fields->decision," +
	"other_fields->development_type," +
	"other_fields->n_statutory_days," +
	"other_fields->date_validated," +
	"other_fields->date_received," +
	"other_fields->target_decision_date," +
	"other_fields->decision_date," +
	"decided_date";

const GET_QUERY_SEARCH = (
	auth,
	appType,
	appState,
	appSize,
	search_terms = null,
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
			"&start_date=" +
			start_date +
			"&end_date=" +
			end_date +
			//* Search
			(search_terms ? `&search=${search_terms}` : "") +
			staticQueryFields
	);
};

const GET_SIMPLE_SEARCH = (
	pcode = "SW19+7AD",
	krad = "1",
	appSize = "Small",
	appType = "Full",
	// appState,
	resultsSize = "50",
	start_date = "2021-05-09",
	end_date = "2021-09-29"
) => {
	return axios.get(
		process.env.REACT_APP_PLANIT_BASE_URL +
			process.env.REACT_APP_QUERY_URL +
			"pcode=" +
			pcode +
			"&krad=" +
			krad +
			"&app_type=" +
			appType +
			// "&app_state=" +
			// appState +
			"&app_size=" +
			appSize +
			"&pg_sz=" +
			resultsSize +
			"&start_date=" +
			start_date +
			"&end_date=" +
			end_date
	);
};

export { GET_QUERY_SEARCH, GET_SIMPLE_SEARCH };
