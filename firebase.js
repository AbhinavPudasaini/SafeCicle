// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "safecircle-ed4ae.firebaseapp.com",
  projectId: "safecircle-ed4ae",
  storageBucket: "safecircle-ed4ae.firebasestorage.app",
  messagingSenderId: "872798677536",
  appId: "1:872798677536:web:92d80a3c1da204f974ea45",
  measurementId: "G-8DFKH91RRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db }
