import React from "react";
import "./Footer.scss";
import { Heart, BrandGithub } from "tabler-icons-react";
import { useNavigate } from "react-router";
import {
	Group,
	Button,
	useMantineColorScheme,
	useMantineTheme,
	ActionIcon,
	Title,
	Text,
	Paper,
	Anchor,
} from "@mantine/core";

const Footer = () => {
	const theme = useMantineTheme();
	const navigate = useNavigate();

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
							Made with 💙 by Valentin Manaila
						</Text>
						{/* <Anchor></Anchor> */}
					</Group>
					<Group position="right">
						<Anchor
							href="https://github.com/studioVMdev/decide-it-client"
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
