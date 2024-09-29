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
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './src/pages/Profile.js';
import Interest from './src/pages/Interest.js';
import TravelComfortScreen from './src/pages/TravelComfortScreen.js';
import MoodCrowdedPlace from "./src/pages/MoodCrowdedPlace.js";
import MoodQuietPlace from "./src/pages/MoodQuietPlace.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="Go to Interests"
        onPress={() => navigation.navigate('Interest')} 
      />
      <Button 
        title="Go to Travel Comfort"
        onPress={() => navigation.navigate('TravelComfortScreen')}
      />
      <Button
        title="Go to Mood Selection"
        onPress={() => navigation.navigate('MoodCrowdedPlace')}
      />
      <Button 
        title="Go to Mood in Quiet Place"
        onPress={() => navigation.navigate('MoodQuietPlace')}
      />
      <StatusBar style="auto" />
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} 
        options={{
          headerStyle: { backgroundColor: '#FAEBCD' }, 
          headerTintColor: '#6C3428', 
        }} />
        <Stack.Screen name="Profile" component={Profile} 
        options={{
          headerStyle: { backgroundColor: '#FAEBCD' }, 
          headerTintColor: '#6C3428', 
        }} 
        />
        <Stack.Screen name="Interest" component={Interest}
        options={{
          headerStyle: { backgroundColor: '#FAEBCD' }, 
          headerTintColor: '#6C3428', 
        }} 
        />
        <Stack.Screen name="TravelComfortScreen" component={TravelComfortScreen}
        options={{
          headerStyle: { backgroundColor: '#FAEBCD' }, 
          headerTintColor: '#6C3428', 
        }}
        />
        <Stack.Screen name="MoodCrowdedPlace" component={MoodCrowdedPlace}
        options={{
          headerStyle: { backgroundColor: '#FAEBCD' }, 
          headerTintColor: '#6C3428', 
        }}
        />
        <Stack.Screen name="MoodQuietPlace" component={MoodQuietPlace}
        options={{
          headerStyle: { backgroundColor: '#FAEBCD' }, 
          headerTintColor: '#6C3428', 
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBCD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
