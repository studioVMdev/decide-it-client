import "./App.scss";

import PageSearch from "./pages/PageSearch";

import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
	return (
		<div className="App">
			<Switch>
				<Redirect from="/" to="/search" exact />

				<Route
					path="/search"
					exact
					render={(routerProps) => <PageSearch {...routerProps} />}
				/>
			</Switch>
		</div>
	);
};

export default App;
