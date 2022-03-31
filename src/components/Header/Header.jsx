import React, { useState } from "react";
import "./Header.scss";
import {
	Group,
	Button,
	useMantineColorScheme,
	ActionIcon,
	Paper,
} from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";

import { NavLink, Link } from "react-router-dom";

const Header = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	const links = [
		{ link: "/simple-search", label: "Simple" },
		{ link: "/advanced-search", label: "Advanced" },
		{ link: "/login", label: "Login" },
	];

	return (
		<>
			<Paper shadow="md" p="xs" m="sm" withBorder>
				<Group position="right">
					{links.map((link) => (
						<Button
							key={link.link}
							variant="subtle"
							size="xs"
							component={Link}
							to={link.link}
							// className={({ isActive }) =>
							// 	isActive ? "active" : "inactive"
							// }
						>
							{link.label}
						</Button>
					))}
					<ActionIcon
						variant="outline"
						color={dark ? "yellow" : "blue"}
						onClick={() => toggleColorScheme()}
						title="Toggle color scheme"
					>
						{dark ? <Sun size={18} /> : <MoonStars size={18} />}
					</ActionIcon>
				</Group>
			</Paper>
		</>
	);
};

export default Header;
