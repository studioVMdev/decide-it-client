const getConfidenceLevel = (durationData) => {
	console.log("assessing confidence level");
	// console.log(durationData);

	for (let index = 0; index < durationData.length; index++) {
		const element = durationData[index];
		if (element <= 0 || isNaN(element)) {
			return "low";
		}
	}

	if (durationData[0] > durationData[1]) {
		return "low";
	}

	if (
		durationData[0] >= durationData[1] &&
		durationData[1] <= durationData[2]
	) {
		return "medium";
	}

	if (
		durationData[0] <= durationData[1] &&
		durationData[1] >= durationData[2]
	) {
		return "high";
	}

	if (
		durationData[0] <= durationData[1] &&
		durationData[1] <= durationData[2] &&
		durationData[2] <= durationData[3]
	) {
		return "high";
	}
};

export default getConfidenceLevel;
