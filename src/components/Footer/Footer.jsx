import React from "react";
import "./Footer.scss";
import { BrandGithub } from "tabler-icons-react";
import {
	Group,
	Button,
	useMantineTheme,
	Text,
	Paper,
	Anchor,
} from "@mantine/core";

const Footer = () => {
	const theme = useMantineTheme();

	return (
		<footer>
			<Paper shadow="md" p="xs" m="sm" withBorder>
				<Group grow>
					{/* <Group position="left">
						<Anchor href="/faq">
							<Text size="sm">FAQ</Text>
						</Anchor>
					</Group> */}
					<Group position="left">
						<Text size="sm" color={theme.primaryColor}>
							Made with 💙 by
							<Anchor
								href="https://www.linkedin.com/in/valentin-manaila/"
								target="_blank"
							>
								<Text color="gray" size="sm">
									{" "}
									Valentin Manaila
								</Text>
							</Anchor>
						</Text>
						{/* <Anchor></Anchor> */}
					</Group>
					<Group position="right">
						<Anchor
							href="https://github.com/valMn/decide-it-client"
							target="_blank"
						>
							<Text color="gray" size="sm">
								{" "}
								Github
							</Text>
						</Anchor>
						<BrandGithub size={14} />
					</Group>
				</Group>
			</Paper>
		</footer>
	);
};

export default Footer;
