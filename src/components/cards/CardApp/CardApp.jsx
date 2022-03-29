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
} from "@mantine/core";
import "./CardApp.scss";

const CardApp = ({ appData }) => {
	const [opened, setOpen] = useState(false);

	return (
		<>
			<Paper shadow="xs" p="xs" m="xs" withBorder>
				<Group position="left">
					<Switch
						checked={opened}
						size="xs"
						onChange={(event) => setOpen(event.currentTarget.checked)}
					/>
					{/* <Text size="xs">Status:</Text> */}
					<Badge size="sm">Size: {appData.app_size}</Badge>
					<Badge color="orange" size="sm">
						Type: {appData.app_type}
					</Badge>
					<Badge color="green" size="sm">
						Status: {appData.app_state}
					</Badge>
					<Badge color="gray" size="sm">
						Validated: {appData.other_fields.date_validated}
					</Badge>
					<Badge color="red" size="sm">
						Decided:{" "}
						{appData.decided_date ? appData.decided_date : "Undecided"}
					</Badge>
					<div className="collapse">
						<Collapse in={opened}>{JSON.stringify(appData)}</Collapse>
					</div>
				</Group>
			</Paper>
		</>
	);
};

export default CardApp;
