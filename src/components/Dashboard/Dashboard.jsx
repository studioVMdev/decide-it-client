import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import { auth, db, logout } from "../../firebase";
import {
	query,
	collection,
	getDocs,
	getDoc,
	where,
	doc,
	setDoc,
	serverTimestamp,
} from "firebase/firestore";

function Dashboard() {

	const [user, loading, error] = useAuthState(auth);
	const [name, setName] = useState("");
	const navigate = useNavigate();

	const fetchUserName = async () => {
		try {
			const q = query(
				collection(db, "users"),
				where("uid", "==", user?.uid)
			);
			const doc = await getDocs(q);
			const data = doc.docs[0].data();
			setName(data.name);
		} catch (err) {
			console.error(err);
			alert("An error occured while fetching user data");
		}
	};


  
	// const getSavedSearches = async () => {
	// 	const savedSearchesRef = collection(db, "saved_searches");
	// 	const q = query(
	// 		collection(db, "saved_searches"),
	// 		where("userId", "==", user?.uid)
	// 	);

	// 	const docSnap = await getDocs(q);
	// 	console.log(docSnap.docs[0].data());

	// 	//! TODO: UNSUBSCRIBE
	// 	// const data = doc.docs[0].data();

	// 	// if (docSnap.exists()) {
	// 	// 	console.log("Document data:", docSnap.data());
	// 	// } else {
	// 	// 	console.log("No such document!");
	// 	// }
	// };

	// // auth.onAuthStateChanged((user) => {});

	useEffect(() => {
		if (loading) return;
		if (!user) return navigate("/");
		fetchUserName();
	}, [user, loading]);

	return (
		<div className="dashboard">
			<div className="dashboard__container">
				Logged in as
				<div>{name}</div>
				<div>{user?.email}</div>
				<button className="dashboard__btn" onClick={logout}>
					Logout
				</button>
			</div>
		</div>
	);
}
export default Dashboard;
