import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXrUgTg-Uysvr8TxUEHYwtlrq_wH0iYbo",
  authDomain: "test-9290e.firebaseapp.com",
  projectId: "test-9290e",
  storageBucket: "test-9290e.appspot.com",
  messagingSenderId: "220605401149",
  appId: "1:220605401149:web:4370baf147e44e858fc254",
  measurementId: "G-ZBE2CB58G6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
