import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			{/* <Header /> */}
			<NotificationsProvider>
				<App />
			</NotificationsProvider>
		</Router>
		{/* <Footer/> */}
	</React.StrictMode>,
	document.getElementById("root")
);
