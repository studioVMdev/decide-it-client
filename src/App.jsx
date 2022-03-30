import "./App.scss";
import PageSimpleSearch from "./pages/PageSimpleSearch/PageSimpleSearch";
import PageAdvancedSearch from "./pages/PageAdvancedSearch/PageAdvancedSearch";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Reset from "./components/Reset/Reset";

// import { Route, Switch, Redirect } from "react-router-dom";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import PageLogin from "./pages/PageLogin/PageLogin";
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
			<Routes>
				{/* <Redirect from="/" to="/simple-search" exact /> */}

				<Route exact path="/dashboard" element={<Dashboard />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/reset" element={<Reset />} />

				<Route exact path="/login" element={<PageLogin />} />

				<Route path="/simple-search" element={<PageSimpleSearch />} />
				<Route path="/advanced-search" element={<PageAdvancedSearch />} />

				<Route path="/" exact element={<Navigate to="simple-search" />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
