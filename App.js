import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import StartPage from "./src/pages/startpage";
import SignupPage from "./src/pages/signup";
import LoginPage from "./src/pages/login";
import HomePage from "./src/pages/homepage";
import ProfilePage from "./src/pages/profile";
import SearchPage from "./src/pages/search";
import BookmarkPage from "./src/pages/bookmark";
import MapPage from "./src/pages/map";
import InterestPage from "./src/pages/interests";
import MoodQuietPage from "./src/pages/moodQuietPlaces"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Bottom Navbar for Homepage
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Bookmark') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C3428',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#FDF0D1',
        },
      })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Search" component={SearchPage} />
        <Tab.Screen name="Map" component={MapPage} />
        <Tab.Screen name="Bookmark" component={BookmarkPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartPage" screenOptions={{headerShown: false,}}>
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomePage" component={HomeTabs} />
        <Stack.Screen name = "InterestPage" component={InterestPage} />
        <Stack.Screen name = "MoodQuietPage" component={MoodQuietPage} />
        <Stack.Screen name = "MoodCrowdedPage" compnent={MoodCrowdedPage} />
        <Stack.Screen name = "TravelComfortPage" component ={TravelComfortPage} />
        <Stack.Screen name = "MapPage" component = {MapPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
