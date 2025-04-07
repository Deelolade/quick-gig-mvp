// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "quick-gig-id.firebaseapp.com",
  projectId: "quick-gig-id",
  storageBucket: "quick-gig-id.firebasestorage.app",
  messagingSenderId: "294881291228",
  appId: "1:294881291228:web:ef7f96fce7b52c07043d19"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);