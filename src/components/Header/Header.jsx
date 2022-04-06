import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Header.scss";
import {
	Group,
	Button,
	useMantineColorScheme,
	ActionIcon,
	Paper,
	Avatar,
	Anchor,
	Box,
	Modal,
} from "@mantine/core";
import { Sun, MoonStars, MapSearch } from "tabler-icons-react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { onAuthStateChanged } from "firebase/auth";
import {
	auth,
	db,
	logout,
	signInWithGoogle,
	signInWithEmailAndPassword,
} from "../../firebase";
import Logo from "../Logo/Logo";

const Header = () => {
	const [user, loading, error] = useAuthState(auth);
	const [opened, setOpened] = useState(false);
	const componentMounted = useRef(true); // (3) component is mounted
	// const auth = getAuth();
	// const user = auth.currentUser;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [name, setName] = useState("");

	// const theme = useMantineTheme();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	const links = [
		// { link: "/simple-search", label: "Simple", variant: "subtle" },
		{ link: "/dashboard", label: "Dashboard", variant: "subtle" },
	];

	// if (user) {
	// 	// User is signed in, see docs for a list of available properties
	// 	// https://firebase.google.com/docs/reference/js/firebase.User
	// 	// ...
	// 	console.log("user is signed in");
	// } else {
	// 	// No user is signed in.
	// }

	// const fetchUserName = async () => {
	// 	try {
	// 		const q = query(
	// 			collection(db, "users"),
	// 			where("uid", "==", user?.uid)
	// 		);
	// 		const doc = await getDocs(q);
	// 		const data = doc.docs[0].data();
	// 		setName(data.name);
	// 	} catch (err) {
	// 		console.error(err);
	// 		alert("An error occured while fetching user data");
	// 	}
	// };

	useEffect(() => {
		// if (componentMounted.current) {
		// user && console.log("logged in");
		user && setIsLoggedIn(true);
		user && setOpened(false);
		// }
		return () => {
			// This code runs when component is unmounted
			componentMounted.current = false; // (4) set it to false when we leave the page
			// console.log("unmounting");
		};
	}, [user]);

	return (
		<header className="header">
			<Paper
				shadow="md"
				p="xs"
				m="sm"
				withBorder
				className="header__container"
			>
				<Box
					className="header__wrapper"
					sx={(theme) => ({
						display: "flex",
						justifyContent: "space-between",
					})}
				>
					<Group className="header__wrapper-left">
						<MapSearch
							className="header__logo-icon"
							color={dark ? "lightgrey" : "slategrey"}
							onClick={() => navigate("/")}
						/>
						<Anchor href="/">
							<Logo className="header__logo-text" />
						</Anchor>
					</Group>

					<Group className="header__wrapper-center">
						{links.map((link) => (
							<Button
								key={link.label}
								variant={link.variant}
								size="xs"
								component={Link}
								to={link.link}
							>
								{link.label}
							</Button>
						))}
					</Group>

					<Group position="right" className="header_wrapper-right">
						<Button
							variant="subtle"
							compact
							size="xs"
							// component={Link}
							label={!isLoggedIn ? "Login" : "Logout"}
							// to={!isLoggedIn ? "/login" : "/advanced-search"}
							onClick={() => {
								if (user) {
									logout();
									// setName("");
									setIsLoggedIn(false);
								} else {
									setOpened(true);
								}
							}}
						>
							{!isLoggedIn ? "Login" : "Logout"}
						</Button>
						{/* <div>{isLoggedIn && name}</div> */}
						{/* <div>{user?.email}</div> */}
						<Avatar
							size="sm"
							src={user ? user.photoURL : ""}
							alt={user ? name : "no image here"}
						/>
						<ActionIcon
							variant="outline"
							color={dark ? "yellow" : "blue"}
							onClick={() => toggleColorScheme()}
							title="Toggle color scheme"
						>
							{dark ? <Sun size={18} /> : <MoonStars size={18} />}
						</ActionIcon>
					</Group>
				</Box>
			</Paper>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Login to your account."
				size={250}
			>
				<button
					className="login__btn login__google"
					style={{ width: "100%" }}
					onClick={signInWithGoogle}
				>
					Login with Google
				</button>
			</Modal>
		</header>
	);
};

export default Header;
