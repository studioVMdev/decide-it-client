import React, { useState } from "react";
import { Paper, TextInput, Button, Select } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	auth,
	getSavedSearch,
	getSavedSearchList,
	setSavedSearch,
	deleteSavedSearch,
} from "../../firebase";

const SaveSearch = ({ searchParams }) => {
	const [user, loading, error] = useAuthState(auth);

	const [searchName, setSearchName] = useState("test");

	// console.log(user.uid);
	return (
		user && (
			<Paper shadow="xs" p="md" m="sm" withBorder>
				<TextInput
					value={searchName}
					onChange={(e) => setSearchName(e.target.value)}
				/>
				<Button
					mt={5}
					color="blue"
					fullWidth
					onClick={() => {
						// console.log(user);
						setSavedSearch(user.uid, searchName, searchParams);
					}}
				>
					Save
				</Button>
				<Button
					mt={5}
					color="lime"
					fullWidth
					onClick={() => {
						// console.log(user);
						getSavedSearch(user.uid, searchName);
						// setSavedSearch(user.uid, searchName, searchParams);
					}}
				>
					Get
				</Button>
				<Button
					mt={5}
					color="grape"
					fullWidth
					onClick={() => {
						// console.log(user);
						getSavedSearchList(user.uid);
						// setSavedSearch(user.uid, searchName, searchParams);
					}}
				>
					Get All
				</Button>
				<Button
					mt={5}
					color="red"
					fullWidth
					onClick={() => {
						console.log(user);
						deleteSavedSearch(user.uid, searchName);
						// setSavedSearch(user.uid, searchName, searchParams);
					}}
				>
					Delete
				</Button>
			</Paper>
		)
	);
};

export default SaveSearch;
