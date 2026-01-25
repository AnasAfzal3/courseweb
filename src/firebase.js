import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Ye line add karein
const firebaseConfig = {
  apiKey: "AIzaSyDF4MR6yJCKDwGcVp85UeD8qOcOJdQ5U8Y",
  authDomain: "siranasweb.firebaseapp.com",
  projectId: "siranasweb",
  storageBucket: "siranasweb.firebasestorage.app",
  messagingSenderId: "769553947480",
  appId: "1:769553947480:web:c11bde3f2b8e3c7912632d",
  measurementId: "G-5GR9TQ14HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // Ye export zaroori hai