/* 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRiApOSSCYTVwcO2iPGGmnm8zwaGo_F9c",
  authDomain: "quiet-quest-195.firebaseapp.com",
  projectId: "quiet-quest-195",
  storageBucket: "quiet-quest-195.appspot.com",
  messagingSenderId: "939137597736",
  appId: "1:939137597736:web:df7e60d69d44c4dfc4101d",
  measurementId: "G-W0B3R6W923",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
*/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNp-vBLAoKBESB6RnMat6MZBKDaI6w5tg",
  authDomain: "quiet-quest-3debd.firebaseapp.com",
  projectId: "quiet-quest-3debd",
  storageBucket: "quiet-quest-3debd.appspot.com",
  messagingSenderId: "591990068159",
  appId: "1:591990068159:web:8c26adc2e3fbaf2651870a",
  measurementId: "G-0Z2WEWQ542"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
