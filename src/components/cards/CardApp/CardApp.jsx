import React, { useState } from "react";
import {
	Container,
	Group,
	Text,
	Paper,
	Collapse,
	Button,
	Switch,
	Badge,
	SimpleGrid,
} from "@mantine/core";
import "./CardApp.scss";

const CardApp = ({ appData }) => {
	const [opened, setOpen] = useState(false);
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
			text: "Validated:",
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

	// const allPropertiesJSX = Object.entries(appData).map(([key, val]) => (
	// 	<div key={key} className="">
	// 		<h3>{key}</h3>
	// 		<p>{val}</p>
	// 	</div>
	// ));

	// console.log(allPropertiesJSX);

	return (
		<>
			<Paper shadow="xs" p="xs" m="xs" withBorder>
				<Group position="left">
					{/* <Text size="xs">Status:</Text> */}
					{/* <Switch
						checked={opened}
						size="xs"
						onChange={(event) => setOpen(event.currentTarget.checked)}
					/> */}
					<SimpleGrid
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
								target="_blank"
								component="a"
								href={appData.url}
								variant="outline"
							>
								Link to App...
							</Badge>
						</Group>

						{/* <details>
							<summary>Sumary here</summary>
							Extra details
						</details> */}
					</SimpleGrid>
					<div className="collapse">
						{/* <Collapse in={opened}>
							{allPropertiesJSX.map((each) => (
								<>{each}</>
							))}
							<pre>appData</pre>
						</Collapse> */}
					</div>
				</Group>
			</Paper>
		</>
	);
};

export default CardApp;
