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
			<Group>
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

	// return (
	// 	<>
	// 		<div className="header">
	// 			<div className="header__container">
	// 				<div className="nav">
	// 					<nav>
	// 						<NavLink to="/simple-search" activeClassName="selected">
	// 							Simple
	// 						</NavLink>
	// 						<NavLink to="/advanced-search" activeClassName="selected">
	// 							Advanced
	// 						</NavLink>
	// 					</nav>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</>
	// );
};

export default Header;
