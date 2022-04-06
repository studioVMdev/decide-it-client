import React, { useState, useEffect } from "react";
import {
	Paper,
	TextInput,
	Button,
	Select,
	Group,
	useMantineTheme,
} from "@mantine/core";
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
	const theme = useMantineTheme();
	const [user, loading, error] = useAuthState(auth);
	const [isListLoading, setIsListLoading] = useState(true);
	const [searchName, setSearchName] = useState("");
	const [savedSearchList, setSavedSearchList] = useState("");

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
		if (savedSearchList) {
			setIsListLoading(false);
		}
	}, [savedSearchList]);

	return (
		<Paper
			m={0}
			p={5}
			variant="outline"
			style={{
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[6]
						: theme.colors.red[0],
				borderRadius: theme.radius.md,
				border: "1px solid " + theme.colors.gray[4],
			}}
		>
			<Group
				style={{
					display: "flex",
					alignItems: "flex-end",
				}}
				grow
			>
				<TextInput
					clearable="true"
					rightSection={
						<X
							size={14}
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
					color={theme.primaryColor}
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
			</Group>

			<Group
				style={{
					display: "flex",
					alignItems: "flex-end",
				}}
				grow
			>
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

				<Group grow>
					<Button
						mt={5}
						variant="outline"
						color={theme.primaryColor}
						disabled={searchName ? 0 : 1}
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

					<Button
						mt={5}
						variant="outline"
						color="red"
						disabled={searchName ? 0 : 1}
						onClick={async () => {
							await deleteSavedSearch(user.uid, searchName);
							fetchList();
							setSearchName("");
						}}
					>
						Delete Saved Search
					</Button>
				</Group>
			</Group>
		</Paper>
	);
};

export default SaveSearch;
