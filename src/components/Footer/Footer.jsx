import React from "react";
import "./Footer.scss";
import {
	Group,
	Button,
	useMantineColorScheme,
	ActionIcon,
	Title,
	Text,
	Paper,
} from "@mantine/core";

const Footer = () => {
	return (
		<>
			<Paper shadow="md" p="xs" m="sm" withBorder>
				<Group position="left">
					<Text order={5}>This is h3 Text</Text>
				</Group>
			</Paper>
		</>
	);
};

export default Footer;
