import React, { useState } from "react";
import "./Header.scss";
import { Group, Button } from "@mantine/core";

import { NavLink } from "react-router-dom";

const Header = () => {
	const links = [
		{ link: "/simple-search", label: "Simple" },
		{ link: "/advanced-search", label: "Advanced" },
		{ link: "/login", label: "Login" },
	];

	return (
		<>
			<Group position="right">
				{links.map((link) => (
					<Button key={link.label} variant="outline">
						<NavLink
							to={link.link}
							className={({ isActive }) =>
								isActive ? "active" : "inactive"
							}
						>
							{link.label}
						</NavLink>
					</Button>

					//   <Button key={link.link} component={Link} to={link.link}>
					//   {link.label}
					// </Button>
				))}
			</Group>
		</>
	);
};

export default Header;
