// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	setPersistence,
	browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCSsIPQUuMrQWP8mcH_7dHj6G0ojm_9IJs",
	authDomain: "todo-2c9e0.firebaseapp.com",
	projectId: "todo-2c9e0",
	storageBucket: "todo-2c9e0.appspot.com",
	messagingSenderId: "1026175306168",
	appId: "1:1026175306168:web:317d6ac8c18ec18d18e74d",
	measurementId: "G-KZEHCC73D6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// Enable session persistence
setPersistence(auth, browserSessionPersistence)
	.then(() => {
		console.log(browserSessionPersistence);

		console.log("Session persistence enabled");
	})
	.catch((error) => {
		// Error occurred while enabling session persistence
		console.error("Error enabling session persistence:", error);
	});
export const db = getFirestore(app);
export default app;
