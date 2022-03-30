import React, { useState } from "react";
import "./Header.scss";
import { Group, Button } from "@mantine/core";

import { NavLink } from "react-router-dom";

const Header = () => {
	const links = [
		{ link: "/simple-search", label: "Simple" },
		{ link: "/advanced-search", label: "Advanced" },
	];

	return (
		<>
			<Group position="right">
				{links.map((link) => (
					<Button key={link.label} variant="outline">
						<NavLink to={link.link} activeClassName="selected">
							{link.label}
						</NavLink>
					</Button>
				))}
			</Group>
		</>
	);


};

export default Header;
