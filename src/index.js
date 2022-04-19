import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";
// import { MantineProvider } from "@mantine/core";
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<NotificationsProvider>
				<App />
			</NotificationsProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
