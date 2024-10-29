import { initializeApp } from "firebase/app";
import { getFirestore } from "@react-native-firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBRiApOSSCYTVwcO2iPGGmnm8zwaGo_F9c",
    authDomain: "quiet-quest-195.firebaseapp.com",
    projectId: "quiet-quest-195",
    storageBucket: "quiet-quest-195.appspot.com",
    messagingSenderId: "939137597736",
    appId: "1:939137597736:web:df7e60d69d44c4dfc4101d",
    measurementId: "G-W0B3R6W923"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);