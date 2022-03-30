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
			data: appData.app_type,
			type: "app_type",
			Conditions: "orange",
			Heritage: "pink",
			Full: "green",
		},
		{
			text: "Size:",
			data: appData.app_size,
			type: "app_size",
			Small: "blue",
		},
		{
			text: "State:",
			data: appData.app_state,
			type: "app_state",
			Permitted: "green",
			Conditions: "orange",
			Rejected: "red",
		},
		{
			text: "Validated:",
			data: appData.other_fields.date_validated,
		},
		{
			text: "Decided:",
			data: appData.decided_date || "UNDECIDED",
		},
	];

	const allPropertiesJSX = Object.entries(appData).map(([key, val]) => (
		<div key={key} className="">
			<h3>{key}</h3>
			<p>{val}</p>
		</div>
	));

	console.log(allPropertiesJSX);

	return (
		<>
			<Paper shadow="xs" p="xs" m="xs" withBorder>
				<Group position="left">
					{/* <Text size="xs">Status:</Text> */}
					<Switch
						checked={opened}
						size="xs"
						onChange={(event) => setOpen(event.currentTarget.checked)}
					/>
					<SimpleGrid
						cols={5}
						spacing="xs"
						breakpoints={[
							{ maxWidth: 980, cols: 5, spacing: "sm" },
							{ maxWidth: 755, cols: 3, spacing: "xs" },
							{ maxWidth: 600, cols: 2, spacing: "xs" },
						]}
					>
						{cellsData.map((cell) => (
							<Group spacing="xs">
								<Text size="xs">{cell.text}</Text>
								<Badge
									sx={{ maxWidth: 100 }}
									size="sm"
									color={cell[appData[cell.type]] || defaultColor}
								>
									{cell.data}
								</Badge>
							</Group>
						))}
						{/* <details>
							<summary>Sumary here</summary>
							Extra details
						</details> */}
					</SimpleGrid>
					<div className="collapse">
						<Collapse in={opened}>
							{/* {allPropertiesJSX.map((each) => (
								<>{each}</>
							))} */}
							<></>

							<pre>appData</pre>
						</Collapse>
					</div>
				</Group>
			</Paper>
		</>
	);
};

export default CardApp;
