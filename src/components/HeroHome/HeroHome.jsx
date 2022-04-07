import React from "react";
import "./HeroHome.scss";
import Logo from "../Logo/Logo";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/hero-animation.json";
import { Paper, Group, Title, useMantineTheme } from "@mantine/core";

const HeroHome = () => {
	const theme = useMantineTheme();

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<section className="hero-home">
			<Paper
				className="hero-home__container"
				shadow="lg"
				withBorder
				m="sm"
				p="xs"
			>
				<Group className="hero-home__wrapper-left">
					<Lottie
						className="hero-home__animation"
						options={defaultOptions}
						height={300}
						width={300}
					/>
				</Group>
				<Group className="hero-home__wrapper-right">
					<Title
						className="hero-home__heading"
						style={{ color: theme.colors.pink[6] }}
						order={2}
					>
						Urban Planning Decision Analysis Tool
					</Title>
					<Title
						className="hero-home__subheading"
						style={{ color: theme.colors.gray[6] }}
						order={4}
					>
						<Logo /> helps construction professionals understand how long
						a planning application will{" "}
						<strong style={{ color: theme.colors.gray[8] }}>
							actually
						</strong>{" "}
						take to be determined.
					</Title>
					<Title
						className="hero-home__cta"
						style={{ color: theme.colors.orange[7] }}
						order={6}
					>
						Try it below using a postcode or use the advanced search
						Dashboard.
					</Title>
				</Group>
			</Paper>
		</section>
	);
};

export default HeroHome;
