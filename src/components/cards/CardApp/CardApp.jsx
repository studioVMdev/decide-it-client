import { Group, Paper, Text, Badge, SimpleGrid } from "@mantine/core";
import "./CardApp.scss";

const CardApp = ({ appData }) => {
	const defaultColor = "gray";
	const cellsData = [
		{
			text: "Type:",
			data: appData.app_type || "NULL",
			type: "app_type",
			Conditions: "orange",
			Heritage: "grape",
			Full: "green",
			Outline: "pink",
		},
		{
			text: "Size:",
			data: appData.app_size || "NULL",
			type: "app_size",
			Small: "blue",
			Medium: "yellow",
			Large: "red",
		},
		{
			text: "State:",
			data: appData.app_state || "NULL",
			type: "app_state",
			Permitted: "green",
			Conditions: "orange",
			Rejected: "red",
		},
		{
			text: "Valid:",
			data: appData.other_fields.date_validated || "INVALID",
		},
		{
			text: "Target:",
			data: appData.other_fields.target_decision_date || "INVALID",
		},
		{
			text: "Decided:",
			data: appData.decided_date || "UNDECIDED",
			type: "decided_date",
		},
	];

	return (
		<>
			<Paper shadow="xs" p="xs" m="xs" withBorder>
				<Group position="left">
					<SimpleGrid
						sx={{ width: "100%" }}
						cols={7}
						spacing="xs"
						breakpoints={[
							{ maxWidth: 1120, cols: 6, spacing: "sm" },
							{ maxWidth: 1000, cols: 5, spacing: "sm" },
							{ maxWidth: 850, cols: 4, spacing: "sm" },
							{ maxWidth: 650, cols: 3, spacing: "xs" },
							{ maxWidth: 500, cols: 2, spacing: "xs" },
						]}
					>
						{cellsData.map((cell, index) => (
							<Group spacing="xs" key={index}>
								<Text size="xs">{cell.text}</Text>
								<Badge
									size="sm"
									color={
										(!appData[cell.type] && cell.type && "red") ||
										cell[appData[cell.type]] ||
										defaultColor
									}
								>
									{cell.data}
								</Badge>
							</Group>
						))}

						<Group spacing="xs">
							<Badge
								fullWidth
								target="_blank"
								component="a"
								href={appData.url}
								variant="outline"
							>
								Link to App...
							</Badge>
						</Group>
					</SimpleGrid>
				</Group>
			</Paper>
		</>
	);
};

export default CardApp;
