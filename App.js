// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  measurementId: "G-W0B3R6W923"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import startpage from './src/pages/startpage'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={startpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

