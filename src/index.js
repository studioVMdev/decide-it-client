import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
ReactDOM.render(
	<React.StrictMode>
		<Router>
			{/* <Header /> */}
			<NotificationsProvider>
				<MantineProvider
					theme={{
						colorScheme: "dark",
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
					<App />
				</MantineProvider>
			</NotificationsProvider>
		</Router>
		{/* <Footer/> */}
	</React.StrictMode>,
	document.getElementById("root")
);
