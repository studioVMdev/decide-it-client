import React, { useState, useEffect } from "react";
import { Paper, TextInput, Button, Select } from "@mantine/core";
import { X } from "tabler-icons-react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	auth,
	getSavedSearch,
	getSavedSearchList,
	setSavedSearch,
	deleteSavedSearch,
} from "../../firebase";

const SaveSearch = ({ searchParams, populateForm }) => {
	const [user, loading, error] = useAuthState(auth);
	const [isListLoading, setIsListLoading] = useState(true);
	const [searchName, setSearchName] = useState(null);
	const [savedSearchList, setSavedSearchList] = useState(null);

	const fetchList = async () => {
		const list = await getSavedSearchList(user.uid);
		setSavedSearchList(list);
	};

	useEffect(() => {
		if (user && !savedSearchList) {
			fetchList();
		}
	});

	useEffect(() => {
		console.log("list updated to ", savedSearchList);

		if (savedSearchList) {
			setIsListLoading(false);
		}
	}, [savedSearchList]);

	return (
		user && (
			<Paper shadow="xs" p="md" m="sm" withBorder>
				<TextInput
					clearable="true"
					rightSection={
						<X
							onClick={() => setSearchName("")}
							color={!searchName ? "lightgrey" : "black"}
						/>
					}
					label="Save this search as..."
					placeholder="Search Name"
					value={searchName}
					onChange={(e) => setSearchName(e.target.value)}
				/>

				<Button
					mt={5}
					variant="outline"
					color="blue"
					disabled={searchName ? 0 : 1}
					fullWidth
					onClick={async () => {
						// console.log(user);
						await setSavedSearch(user.uid, searchName, searchParams);
						fetchList();
					}}
				>
					New/ Edit Search
				</Button>
				{!isListLoading && (
					<Select
						clearable="true"
						searchable="true"
						value={searchName}
						onChange={(val) => {
							setSearchName(val);
						}}
						label="Your Saved Searches"
						placeholder="Saved Searches List..."
						data={savedSearchList}
					/>
				)}
				<Button
					mt={5}
					variant="outline"
					color="lime"
					disabled={searchName ? 0 : 1}
					fullWidth
					onClick={async () => {
						// console.log(user);
						const savedParams = await getSavedSearch(
							user.uid,
							searchName
						);
						populateForm(savedParams);
					}}
				>
					Load Saved Search
				</Button>
				{/* <Button
					variant="outline"
					mt={5}
					color="grape"
					fullWidth
					onClick={() => {
						// console.log(user);
						fetchList();
						// setSavedSearch(user.uid, searchName, searchParams);
					}}
				>
					Get All
				</Button> */}
				<Button
					mt={5}
					variant="outline"
					color="red"
					disabled={searchName ? 0 : 1}
					fullWidth
					onClick={async () => {
						await deleteSavedSearch(user.uid, searchName);
						fetchList();
						setSearchName("");
					}}
				>
					Delete Saved Search
				</Button>
			</Paper>
		)
	);
};

export default SaveSearch;
