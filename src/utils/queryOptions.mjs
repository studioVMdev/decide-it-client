// Undecided The application is currently active, no decision has been made
// Permitted The application was approved
// Conditions The application was approved, but conditions were imposed
// Rejected The application was refused
// Withdrawn The application was withdrawn before a decision was taken
// Referred The application was referred to government or to another authority
// Unresolved The application is no longer active but no decision was made eg split decision
// Other St

export default class Options {
	static appSize() {
		return ["Small", "Medium", "Large"];
	}

	static appState() {
		return [
			"Undecided",
			"Permitted",
			"Conditions",
			"Rejected",
			"Withdrawn",
			"Referred",
			"Unresolved",
			"Other",
		];
	}
	static duration() {
		return ["Registration", "Target", "Decision", "Total"];
	}
	static appType() {
		return [
			"Full",
			"Outline",
			"Amendment",
			"Conditions",
			"Heritage",
			"Trees",
			"Advertising",
			"Telecoms",
			"Other",
		];
	}

	static authority() {
    return [
			"Barking+and+Dagenham",
			"Barnet",
			"Bexley",
			"Brent",
			"Bromley",
			"Camden",
			"City",
			"Croydon",
			"Ealing",
			"Enfield",
			"Greenwich",
			"Hackney",
			"Hammersmith+and+Fulham",
			"Haringey",
			"Harrow",
			"Havering",
			"Hillingdon",
			"Hounslow",
			"Islington",
			"Kensington",
			"Kingston",
			"Lambeth",
			"Lewisham",
			"Merton",
			"Newham",
			"Redbridge",
			"Richmond",
			"Southwark",
			"Sutton",
			"Tower+Hamlets",
			"Waltham+Forest",
			"Wandsworth",
			"Westminster",
		];
	}
}
