import dayjs from "dayjs";

const getDecisionDatesStats = (rawData) => {
	let registrationDuration = null;
	let decisionTarget = null;
	let statutoryDays = null;
	let decisionDuration = null;
	let totalDuration = null;

	rawData.forEach((app) => {
		let date_received = dayjs(app.other_fields.date_received);
		let date_validated = dayjs(app.other_fields.date_validated);
		let target_decision_date = dayjs(app.other_fields.target_decision_date);
		let decided_date = dayjs(app.decided_date);
		let n_statutory_days = dayjs(app.other_fields.n_statutory_days);

		registrationDuration +=
			date_validated.diff(date_received, "day") / rawData.length || 0;
		decisionTarget +=
			target_decision_date.diff(date_validated, "day") / rawData.length || 0;
		decisionDuration +=
			decided_date.diff(date_validated, "day") / rawData.length || 0;
		totalDuration +=
			decided_date.diff(date_received, "day") / rawData.length || 0;
		statutoryDays += n_statutory_days / rawData.length || 0;
	});

	console.log("reg dur", registrationDuration);
	console.log("target dur", decisionTarget);
	console.log("decision dur", decisionDuration);
	console.log("total dur", totalDuration);
	console.log("statutory dur", statutoryDays);

	return [
		registrationDuration,
		decisionTarget,
		decisionDuration,
		totalDuration,
	];
};

export default getDecisionDatesStats;
