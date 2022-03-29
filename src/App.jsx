import "./App.scss";
import PageSimpleSearch from "./pages/PageSimpleSearch/PageSimpleSearch";
import PageAdvancedSearch from "./pages/PageAdvancedSearch/PageAdvancedSearch";

import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const links = [
	{ link: "simple-search", label: "simple" },
	{ link: "advanced-search", label: "advanced" },
];
const App = () => {
	return (
		<div className="App">
			<Header />
			<Switch>
				<Redirect from="/" to="/simple-search" exact />
				<Route
					path="/simple-search"
					render={(routerProps) => <PageSimpleSearch {...routerProps} />}
				/>

				<Route
					path="/advanced-search"
					render={(routerProps) => <PageAdvancedSearch {...routerProps} />}
				/>
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
