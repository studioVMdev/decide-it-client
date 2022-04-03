import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Header.scss";
import {
	Group,
	Button,
	useMantineColorScheme,
	ActionIcon,
	Paper,
	Avatar,
	Text,
	Container,
	Box,
	SimpleGrid,
	useMantineTheme,
} from "@mantine/core";
import { Sun, MoonStars, MapSearch } from "tabler-icons-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
// import { onAuthStateChanged } from "firebase/auth";
import { auth, db, logout } from "../../firebase";
// import {
// 	query,
// 	collection,
// 	getDocs,
// 	getDoc,
// 	where,
// 	doc,
// 	setDoc,
// 	serverTimestamp,
// } from "firebase/firestore";

const Header = () => {
	const [user, loading, error] = useAuthState(auth);
	const componentMounted = useRef(true); // (3) component is mounted
	// const auth = getAuth();
	// const user = auth.currentUser;
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [name, setName] = useState("");

	// const theme = useMantineTheme();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	const links = [
		{ link: "/simple-search", label: "Simple", variant: "subtle" },
		{ link: "/advanced-search", label: "Advanced", variant: "subtle" },
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
		user && console.log("logged in");
		user && setIsLoggedIn(true);
		// }
		return () => {
			// This code runs when component is unmounted
			componentMounted.current = false; // (4) set it to false when we leave the page
			console.log("unmounting");
		};
	}, [user]);

	return (
		<>
			<Paper shadow="md" p="xs" m="sm" withBorder>
				<Box
					sx={(theme) => ({
						display: "flex",
						justifyContent: "space-between",
					})}
				>
					<Group>
						<MapSearch color={dark ? "lightgrey" : "slategrey"} />
						<Box
							sx={(theme) => ({
								display: "flex",
								justifyContent: "space-between",
							})}
						>
							<Text color={dark ? "lime" : "lime"} m={0}>
								plan
							</Text>
							<Text weight={700} color={dark ? "cyan" : "cyan"} m={0}>
								in
							</Text>
							<Text weight={700} color={dark ? "cyan" : "cyan"} m={0}>
								SIGHT
							</Text>
						</Box>
					</Group>
					<Group>
						{links.map((link) => (
							// 	<Button
							// 		key={link.label}
							// 		variant={link.variant}
							// 		size="xs"
							// 		component={Link}
							// 		to={link.link}
							// 		onClick={() => {
							// 			if (user && link.label === "Logout") {
							// 				logout();
							// 				setName("");
							// 				setIsLoggedIn(false);
							// 			}
							// 		}}
							// 	>
							// 		{link.label}
							// 	</Button>
							// ))}

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

					{/* // 	link: !isLoggedIn ? "/login" : "/advanced-search",
		// 	variant: "light",
		// 	label: ,
		// 	variant: "light", */}
					<Group position="right">
						<Button
							variant="light"
							size="xs"
							component={Link}
							label={!isLoggedIn ? "Login" : "Logout"}
							to={!isLoggedIn ? "/login" : "/advanced-search"}
							onClick={() => {
								if (user) {
									logout();
									setName("");
									setIsLoggedIn(false);
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
		</>
	);
};

export default Header;
