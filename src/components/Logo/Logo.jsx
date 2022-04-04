import React from "react";

import { Text, Box, useMantineColorScheme } from "@mantine/core";

const Logo = ({ size = "", className }) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	return (
		<Box
			className={className}
			style={{ userSelect: "none", textDecoration: "none" }}
			sx={(theme) => ({
				display: "inline-flex",
				maxWidth: "fit-content",
				// justifyContent: "space-between",
			})}
		>
			<Text
				className={className}
				size={size}
				color={dark ? "lime" : "lime"}
				m={0}
			>
				plan
			</Text>
			<Text
				className={className}
				size={size}
				weight={700}
				color={dark ? "cyan" : "cyan"}
				m={0}
			>
				in
			</Text>
			<Text
				className={className}
				size={size}
				weight={700}
				color={dark ? "cyan" : "cyan"}
				m={0}
			>
				SIGHT
			</Text>
		</Box>
	);
};

export default Logo;
