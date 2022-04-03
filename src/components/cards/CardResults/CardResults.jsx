import React from "react";

import {
	Accordion,
	Paper,
	Center,
	Alert,
	useMantineTheme,
	Text,
} from "@mantine/core";

//CircleCheck
//Alert Circke
//AlertTriangle

import {
	CircleDashed,
	AlertCircle,
	CircleCheck,
	AlertTriangle,
} from "tabler-icons-react";

const CardResults = ({
	confidenceLevel = "",
	confidenceLevelColor = "",
	durationData = null,
	requestSize = 0,
	responseSize = 0,
}) => {
	const theme = useMantineTheme();

	const confidenceLevelIconSize = 16;
	console.log(confidenceLevel);

	const confidenceLevelIcon = {
		neutral: <CircleDashed size={confidenceLevelIconSize} />,
		high: <CircleCheck size={confidenceLevelIconSize} />,
		medium: <AlertTriangle size={confidenceLevelIconSize} />,
		low: <AlertCircle size={confidenceLevelIconSize} />,
	};

	return (
		<>
			<Alert
				m="sm"
				icon={
					!confidenceLevel
						? confidenceLevelIcon["neutral"]
						: confidenceLevelIcon[confidenceLevel]
				}
				title={
					confidenceLevel
						? "Analysis Confidence Level " + confidenceLevel.toUpperCase()
						: "Analysis results will appear here..."
				}
				color={confidenceLevelColor}
			>
				<Text color={confidenceLevelColor}>
					{confidenceLevel === "low" &&
						"Please change your search criteria or interrogate the detailed application list."}
					{confidenceLevel === "medium" &&
						"Please interrogate the detailed application list."}
				</Text>
				{confidenceLevel && durationData && (
					<Text>
						On average, it takes {durationData[2]} days for a planning
						application to be determined.
					</Text>
				)}
				{confidenceLevel && durationData && (
					<Text>
						Retrieved {responseSize} out of {requestSize} requested
						applications.
					</Text>
				)}
			</Alert>
		</>
	);
};

export default CardResults;
