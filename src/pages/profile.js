import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';


export default function ProfilePage({ navigation }) {

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Logged Out", "You have been logged out.");
        // Navigate the user back to the login page
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginPage' }],
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Logout Error", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>This is Profile Page.</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButtonText} onPress={() => navigation.navigate("InterestPage")}>
        <Text style={styles.logoutButtonText}>Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#FDF0D1",
    paddingVertical: 20,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C3428',
    fontFamily: 'SF Pro Text',
    marginBottom: 30,
  },

  logoutButton: {
    backgroundColor: '#CEE6F3',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  logoutButtonText: {
    color: '#6C3428',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Text',
  },
});

