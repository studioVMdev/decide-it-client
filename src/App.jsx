import React, { useState } from "react";
import "./App.scss";
import PageSimpleSearch from "./pages/PageSimpleSearch/PageSimpleSearch";
import PageAdvancedSearch from "./pages/PageAdvancedSearch/PageAdvancedSearch";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Reset from "./components/Reset/Reset";

import { Routes, Route, Navigate, Link } from "react-router-dom";
import PageLogin from "./pages/PageLogin/PageLogin";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import {
	MantineProvider,
	ColorSchemeProvider,
	MantineThemeOverride,
	ColorScheme,
} from "@mantine/core";

const links = [
	{ link: "simple-search", label: "simple" },
	{ link: "advanced-search", label: "advanced" },
];

const myTheme = {
	colorScheme: "light",
	primaryColor: "cyan",
	defaultRadius: 6,
};

const App = () => {
	const [colorScheme, setColorScheme] = useState("light");

	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{
					...myTheme,
					colorScheme: colorScheme,
					breakpoints: {
						xs: 500,
						sm: 800,
						md: 1000,
						lg: 1200,
						xl: 1400,
					},
				}}
				withGlobalStyles
			>
				<div className="App">
					<Header />
					<div className="App__body">
						<Routes>
							<Route exact path="/dashboard" element={<Dashboard />} />
							<Route exact path="/register" element={<Register />} />
							<Route exact path="/reset" element={<Reset />} />

							<Route exact path="/login" element={<PageLogin />} />

							<Route
								path="/simple-search"
								element={<PageSimpleSearch />}
							/>
							<Route
								path="/advanced-search"
								element={<PageAdvancedSearch />}
							/>

							<Route
								path="/"
								exact
								element={<Navigate to="simple-search" />}
							/>
						</Routes>
					</div>

					<Footer />
				</div>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default App;
