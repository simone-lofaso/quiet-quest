import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';

import StartPage from "./src/pages/startpage";
import SignupPage from "./src/pages/signup";
import LoginPage from "./src/pages/login";
import HomePage from "./src/pages/homepage";
import ProfilePage from "./src/pages/profile";
import SearchPage from "./src/pages/search";
import BookmarkPage from "./src/pages/bookmark";
import MapPage from "./src/pages/map";
import InterestPage from "./src/pages/interests";
import MoodQuietPlaces from "./src/pages/moodQuietPlaces"
import MoodCrowdedPage from "./src/pages/moodCrowdedPage";
import TravelComfortScreen from "./src/pages/travelComfortLevel";
import VerificationEmailPage from "./src/pages/verification";
import ForgotPasswordPage from "./src/pages/forgotpassword";
import { Alert } from "react-native";
import { PreferenceProvider } from "./src/services/usePreferences";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Bottom Navbar for Homepage
function HomeTabs({ route }) {
  const isGuest = route.params?.isGuest || false;
  const initialRouteName = route.params?.initialRouteName || 'Home';

  const handleGuestRestriction = (navigation, screenName) => {
    if (isGuest && screenName !== 'Map') {
      Alert.alert(
        'Access Restricted', 'Please sign up or log in to access this page.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Redirect to StartPage after showing alert
              navigation.navigate('StartPage');
            },
          },
        ],
        { cancelable: false }
      );
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route, navigation }) => ({
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
        tabBarButton: (props) => {
          const { onPress } = props;
          return (
            <TouchableOpacity
              {...props}
              onPress={() => {
                if (handleGuestRestriction(navigation, route.name)) {
                  onPress();
                }
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchPage} options={{ headerShown: false }} />
      <Tab.Screen name="Map" component={MapPage} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmark" component={BookmarkPage} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <PreferenceProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartPage" screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="StartPage" component={StartPage} />
          <Stack.Screen name="SignupPage" component={SignupPage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="HomePage" component={HomeTabs} />
          <Stack.Screen name="InterestPage" component={InterestPage} />
          <Stack.Screen name="MoodQuietPage" component={MoodQuietPlaces} />
          <Stack.Screen name="MoodCrowdedPage" component={MoodCrowdedPage} />
          <Stack.Screen name="TravelComfortPage" component={TravelComfortScreen} />
          <Stack.Screen name="MapPage" component={MapPage} />
          <Stack.Screen name="VerificationEmailPage" component={VerificationEmailPage} />
          <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PreferenceProvider>
  );
}
