import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Fix: Removed modular import for getStorage and switched to compat library to resolve export errors.
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeU-dk7P6EQN_Z4rzFIbK5YTaxT71Z4XY",
  authDomain: "endergp-portfolio.firebaseapp.com",
  projectId: "endergp-portfolio",
  storageBucket: "endergp-portfolio.appspot.com",
  messagingSenderId: "1073247876470",
  appId: "1:1073247876470:web:a70af38da4394071bf3657",
  measurementId: "G-8FLPNELDD1"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Fix: Initialize compat app as well to use compat services like storage.
// This is guarded to prevent errors during hot-reloading.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = firebase.storage();

// Check if the firebase config has been filled out
export const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";