import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";

import {
	getFirestore,
	query,
	deleteDoc,
	getDocs,
	getDoc,
	doc,
	set,
	setDoc,
	collection,
	where,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyCEPbE4DsGKat6NBHmSMCQqNfO3S6EFAjw",
	authDomain: "plan-insight-firebase.firebaseapp.com",
	projectId: "plan-insight-firebase",
	storageBucket: "plan-insight-firebase.appspot.com",
	messagingSenderId: "758060799345",
	appId: "1:758060799345:web:18db0779253943187d92d0",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//! Authentication 🔽
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;

		const q = query(collection(db, "users"), where("uid", "==", user.uid));

		const docs = await getDocs(q);

		if (docs.docs.length === 0) {
			await setDoc(doc(db, "users", user.uid), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await setDoc(doc(db, "users", user.uid), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
		});
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset link sent!");
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const logout = () => {
	signOut(auth);
};

//! Authentication 🔼

//! Database 🔽
const getSavedSearchList = async (userId) => {
	const querySnapshot = await getDocs(
		collection(db, `users/${userId}/searches`)
	);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		console.log(doc.id, " => ", doc.data());
	});
};

const getSavedSearch = async (userId, searchName) => {
	try {
		const docRef = doc(db, `users/${userId}/searches`, searchName);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log("Document data:", docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	} catch (error) {
		console.log(error);
	}
};

const setSavedSearch = async (userId, searchName, searchParams) => {
	try {
		console.log("setting", searchName, searchParams);

		await setDoc(
			doc(db, `users/${userId}/searches`, searchName),
			searchParams
		);
	} catch (error) {
		console.log(error);
	}
};

const deleteSavedSearch = async (userId, searchName) => {
	try {
		await deleteDoc(doc(db, `users/${userId}/searches`, searchName));
	} catch (error) {
		console.log(error);
	}
};
//! Database 🔼

export {
	auth,
	db,
	signInWithGoogle,
	logInWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
	getSavedSearch,
	getSavedSearchList,
	setSavedSearch,
	deleteSavedSearch,
};
