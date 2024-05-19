// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GapiKey,
  authDomain: import.meta.env.VITE_GauthDomain,
  databaseURL: import.meta.env.VITE_GdatabaseURL,
  projectId: import.meta.env.VITE_GprojectId,
  storageBucket: import.meta.env.VITE_GstorageBucket,
  messagingSenderId: import.meta.env.VITE_GmessagingSenderId,
  appId: import.meta.env.VITE_GappId,
  measurementId: import.meta.env.VITE_GmeasurementId,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

// // Initialize Firebase
