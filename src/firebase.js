import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYfnZlaN8XnC3dCGmLb1aBOrUchg1GJYU",
  authDomain: "to-do-list-ce7ba.firebaseapp.com",
  projectId: "to-do-list-ce7ba",
  storageBucket: "to-do-list-ce7ba.firebasestorage.app",
  messagingSenderId: "300796541754",
  appId: "1:300796541754:web:77a1f6dddbde710162ae03",
  measurementId: "G-Z3WC747XK9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }