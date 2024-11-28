import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';


export default function ProfilePage({ navigation }) {
  const [username, setUsername] = useState("");
  // Fetch the user's display name when the component mounts
  useFocusEffect(React.useCallback(() => {
    const user = auth.currentUser;
    if (user) {
      setUsername(user.displayName || "Guest");
    } else {
      setUsername("Guest");
    }
  }, [])
  );
  
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
      {/* Display Username */}
      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{username}</Text>
      </View>
      <Text style={styles.welcomeText}>This is Profile Page.</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate("InterestPage")}>
        <Text style={styles.quizButtonText}>Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate('editProfile')}  // Navigate to EditProfile
        >
         <Text style={styles.editButtonText}>Edit</Text>
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

  quizButton: {
    backgroundColor: '#CEE6F3',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  quizButtonText: {
    color: '#6C3428',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Text',
  },

  editButton: {
    position: 'absolute',
    top: 50,   
    right: 20, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#CEE6F3', // Light background color
    borderRadius: 15,
    zIndex: 10, // Ensures it appears above other elements
  },

  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C4A4A',
    fontFamily: 'SF Pro Text',
    textAlign: 'center',
  },

  usernameContainer: {
    position: 'absolute',
    top: 150, // Adjust positioning for the top of the page
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 10,
  },

  usernameText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6C3428',
    fontFamily: 'SF Pro Text',
    marginBottom: 30,
  },
});

